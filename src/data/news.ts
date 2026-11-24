export const MAXIMUM_NEWS_ITEMS = 30;
export const MAXIMUM_NEWS_WORDS = 100;

export const sortNewsByDate = <T extends { data: { publishedAt: Date } }>(items: T[]) =>
  [...items].sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());

export const formatNewsDate = (date: Date) => new Intl.DateTimeFormat('fi-FI', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/Helsinki',
}).format(date);

const plainText = (body = '') => body
  .replace(/!?(\[([^\]]*)\])\([^)]*\)/g, '$2')
  .replace(/[`*_>#]/g, '')
  .replace(/\s+/g, ' ')
  .trim();

export const limitNewsWords = (body: string | undefined, maximum = MAXIMUM_NEWS_WORDS) => {
  const words = plainText(body).split(' ').filter(Boolean);
  return words.length > maximum ? `${words.slice(0, maximum).join(' ')}…` : words.join(' ');
};
