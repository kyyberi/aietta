import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { sortInsightsByDate } from '../data/insights';

export const prerender = true;

const xmlEscape = (value: string) => value.replace(/[<>&'\"]/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[character] ?? character));

export const GET: APIRoute = async ({ site }) => {
  const baseUrl = site ?? new URL('https://aietta.net');
  const staticPaths = ['/', '/mika-ai-etta/', '/stagella/', '/tapahtumat/ai-tarvitsee-muutakin-kuin-teknologiaa/', '/oivallukset/'];
  const insights = sortInsightsByDate(await getCollection('oivallukset', ({ data }) => !data.draft));
  const urls: { loc: string; lastmod?: string }[] = [
    ...staticPaths.map((path) => ({ loc: new URL(path, baseUrl).href, lastmod: undefined })),
    ...insights.map((insight) => ({
      loc: new URL(`/oivallukset/${insight.data.slug}/`, baseUrl).href,
      lastmod: insight.data.updatedAt.toISOString().slice(0, 10),
    })),
  ];

  const body = urls
    .map(({ loc, lastmod }) => `  <url><loc>${xmlEscape(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`)
    .join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
