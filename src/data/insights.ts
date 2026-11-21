export const insightTypeLabels = {
  'event-insights': 'Tapahtuman oivallus',
  'expert-article': 'Asiantuntijakirjoitus',
  discussion: 'Keskustelunavaus',
} as const;

export type InsightType = keyof typeof insightTypeLabels;

export const formatInsightDate = (date: Date) =>
  new Intl.DateTimeFormat('fi-FI', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);

export const sortInsightsByDate = <T extends { data: { publishedAt: Date } }>(insights: T[]) =>
  [...insights].sort((first, second) => second.data.publishedAt.getTime() - first.data.publishedAt.getTime());
