#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const DEFAULT_EVENT_ID = 'ai-tarvitsee-muutakin-kuin-teknologiaa';
const EVENTS_FILE = fileURLToPath(new URL('../src/data/events.ts', import.meta.url));
const ENV_FILE = fileURLToPath(new URL('../.env.local', import.meta.url));

const usage = `Usage:
  node tools/update-event-registration-count.mjs [options]

Set MAILERLITE_API_TOKEN and MAILERLITE_FORM_ID in .env.local, or provide them as shell variables.

Options:
  --list-forms     List MailerLite API form ids, types, public slugs, and conversion counts
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

const readLocalEnv = async () => {
  try {
    const content = await readFile(ENV_FILE, 'utf8');
    return Object.fromEntries(
      content.split(/\r?\n/).flatMap((line) => {
        const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
        if (!match) return [];
        const [, key, rawValue] = match;
        const value = rawValue.replace(/^(?:"([\s\S]*)"|'([\s\S]*)')$/, (_quoted, doubleQuoted, singleQuoted) => doubleQuoted ?? singleQuoted);
        return [[key, value]];
      }),
    );
  } catch (error) {
    if (error?.code === 'ENOENT') return {};
    throw error;
  }
};

const localEnv = await readLocalEnv();
const token = process.env.MAILERLITE_API_TOKEN ?? localEnv.MAILERLITE_API_TOKEN;
const formId = readOption('--form-id') ?? process.env.MAILERLITE_FORM_ID ?? localEnv.MAILERLITE_FORM_ID;
const eventId = readOption('--event-id') ?? DEFAULT_EVENT_ID;
const dryRun = args.includes('--dry-run');
const listForms = args.includes('--list-forms');

if (!token) throw new Error('MAILERLITE_API_TOKEN is required.');

const headers = {
  Accept: 'application/json',
  Authorization: `Bearer ${token}`,
};

const getForms = async () => {
  const forms = [];
  for (const type of ['embedded', 'popup', 'promotion']) {
    let page = 1;
    while (true) {
      const formsUrl = new URL(`https://connect.mailerlite.com/api/forms/${type}`);
      formsUrl.searchParams.set('limit', '100');
      formsUrl.searchParams.set('page', String(page));
      const response = await fetch(formsUrl, { headers });
      if (!response.ok) {
        const detail = await response.text();
        throw new Error(`MailerLite form list request failed (${response.status}): ${detail.slice(0, 300)}`);
      }

      const payload = await response.json();
      forms.push(...(Array.isArray(payload.data) ? payload.data : []));
      if (page >= Number(payload.meta?.last_page ?? 1)) break;
      page += 1;
    }
  }
  return forms;
};

if (listForms) {
  const forms = await getForms();
  if (forms.length === 0) {
    process.stdout.write('No MailerLite forms found.\n');
  } else {
    process.stdout.write('MailerLite API forms:\n');
    for (const form of forms) {
      const name = String(form.name ?? 'Unnamed form').replace(/[\r\n\t]+/g, ' ');
      const conversions = form.conversions_count ?? 0;
      process.stdout.write(`${form.id}\t${form.type}\t${form.slug ?? '—'}\t${name}\t${conversions} conversions\n`);
    }
  }
  process.exit(0);
}

if (!formId) throw new Error('MAILERLITE_FORM_ID or --form-id is required.');

const forms = await getForms();
const matchingForm = forms.find((form) => String(form.id) === formId || form.slug === formId);
const resolvedFormId = String(matchingForm?.id ?? formId);
if (!matchingForm && !/^\d+$/.test(formId)) {
  throw new Error(`No MailerLite form matched "${formId}". Run with --list-forms to inspect available forms.`);
}

const apiUrl = new URL('https://connect.mailerlite.com/api/subscribers');
apiUrl.searchParams.set('filter[form]', resolvedFormId);
apiUrl.searchParams.set('filter[status]', 'active');
apiUrl.searchParams.set('limit', '1000');

let activeCount = 0;
let pageCount = 0;
let cursor;

while (true) {
  if (cursor) apiUrl.searchParams.set('cursor', cursor);
  const response = await fetch(apiUrl, { headers });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`MailerLite request failed (${response.status}): ${detail.slice(0, 300)}`);
  }

  const payload = await response.json();
  const subscribers = Array.isArray(payload.data) ? payload.data : [];
  activeCount += subscribers.length;
  pageCount += 1;

  cursor = payload.meta?.next_cursor;
  if (!cursor) break;
  if (pageCount > 10_000) throw new Error('Stopped after 10,000 pages because MailerLite pagination was invalid.');
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
