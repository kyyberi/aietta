#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const DEFAULT_EVENT_ID = 'ai-tarvitsee-muutakin-kuin-teknologiaa';
const EVENTS_FILE = fileURLToPath(new URL('../src/data/events.ts', import.meta.url));

const usage = `Usage:
  MAILERLITE_API_TOKEN='…' MAILERLITE_FORM_ID='…' node tools/update-event-registration-count.mjs [options]

Options:
  --event-id <id>  Event id in src/data/events.ts (default: ${DEFAULT_EVENT_ID})
  --form-id <id>   MailerLite API form id (overrides MAILERLITE_FORM_ID)
  --dry-run        Print the active registration count without changing a file
  --help           Show this help
`;

const args = process.argv.slice(2);
const readOption = (name) => {
  const index = args.indexOf(name);
  if (index === -1) return undefined;
  const value = args[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`Missing value for ${name}.`);
  return value;
};

if (args.includes('--help')) {
  process.stdout.write(usage);
  process.exit(0);
}

const token = process.env.MAILERLITE_API_TOKEN;
const formId = readOption('--form-id') ?? process.env.MAILERLITE_FORM_ID;
const eventId = readOption('--event-id') ?? DEFAULT_EVENT_ID;
const dryRun = args.includes('--dry-run');

if (!token) throw new Error('MAILERLITE_API_TOKEN is required.');
if (!formId) throw new Error('MAILERLITE_FORM_ID or --form-id is required.');

const apiUrl = new URL(`https://connect.mailerlite.com/api/forms/${encodeURIComponent(formId)}/subscribers`);
apiUrl.searchParams.set('limit', '100');

let page = 1;
let activeCount = 0;
let pageCount = 0;

while (true) {
  apiUrl.searchParams.set('page', String(page));
  const response = await fetch(apiUrl, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`MailerLite request failed (${response.status}): ${detail.slice(0, 300)}`);
  }

  const payload = await response.json();
  const subscribers = Array.isArray(payload.data) ? payload.data : [];
  activeCount += subscribers.filter((subscriber) => subscriber.status === 'active').length;
  pageCount += 1;

  const lastPage = Number(payload.meta?.last_page);
  if (Number.isFinite(lastPage)) {
    if (page >= lastPage) break;
  } else if (subscribers.length < 100) {
    break;
  }

  page += 1;
  if (page > 10_000) throw new Error('Stopped after 10,000 pages because MailerLite pagination was invalid.');
}

if (dryRun) {
  process.stdout.write(`Active registrations: ${activeCount} (read from ${pageCount} page${pageCount === 1 ? '' : 's'})\n`);
  process.exit(0);
}

const source = await readFile(EVENTS_FILE, 'utf8');
const eventStart = `    id: '${eventId}',`;
const startIndex = source.indexOf(eventStart);
if (startIndex === -1) throw new Error(`Could not find event id "${eventId}" in src/data/events.ts.`);

const endIndex = source.indexOf('\n  },', startIndex);
if (endIndex === -1) throw new Error(`Could not find the end of event "${eventId}".`);

const eventBlock = source.slice(startIndex, endIndex);
const formLine = /^(\s*)registrationFormId: [^\n]+\n/m;
if (!formLine.test(eventBlock)) throw new Error(`Event "${eventId}" has no registrationFormId field.`);

const countLine = /^(\s*)registrationCount: \d+,\n/m;
let updatedBlock;
if (countLine.test(eventBlock)) {
  updatedBlock = eventBlock.replace(countLine, (_line, indent) => `${indent}registrationCount: ${activeCount},\n`);
} else {
  updatedBlock = eventBlock.replace(formLine, (line, indent) => `${line}${indent}registrationCount: ${activeCount},\n`);
}

const updatedSource = `${source.slice(0, startIndex)}${updatedBlock}${source.slice(endIndex)}`;
if (updatedSource === source) {
  process.stdout.write(`Registration count is already ${activeCount}; no file changes made.\n`);
} else {
  await writeFile(EVENTS_FILE, updatedSource);
  process.stdout.write(`Updated ${eventId} to ${activeCount} active registrations.\n`);
}
