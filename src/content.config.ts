import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const oivallukset = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/oivallukset' }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: z.string().min(1),
    description: z.string().min(1),
    type: z.enum(['event-insights', 'expert-article', 'discussion']),
    authorId: z.string().min(1),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    coverImage: z.string().startsWith('/'),
    listingImage: z.string().startsWith('/').optional(),
    tags: z.array(z.string().min(1)).min(1),
    relatedEventId: z.string().nullable(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { oivallukset };
