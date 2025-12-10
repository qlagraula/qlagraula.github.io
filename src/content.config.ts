import { defineCollection, type ImageFunction, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { boolean } from 'astro:schema';

export const seoSchemaWithoutImage = z.object({
  title: z.string(),
  description: z.string(),
  type: z.string().optional(),
  keywords: z.string().optional(),
  canonicalUrl: z.string().optional(),
  robots: z.string().optional(),
});

const seoSchema = (image: ImageFunction) =>
  z
    .object({
      image: image().optional(),
    })
    .merge(seoSchemaWithoutImage);

const pageCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/pages' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      headline: z.string().optional(),
      description: z.string().optional(),
      seo: seoSchema(image),
    }),
});

const linkCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.yml', base: './src/content/links' }),
  schema: z.object({
    label: z.string(),
    name: z.string(),
    url: z.string(),
  }),
});

const skillCollection = defineCollection({
  schema: z.object({
    label: z.string(),
  }),
});

const jobCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    company: z.string(),
    contract: z.string(),
    location: z.string(),
    from: z.number(),
    to: z.number().or(z.enum(['Now'])),
    duration: z.string(),
    url: z.string(),
  }),
});

const postCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.date(),
      image: image().optional(),
      seo: seoSchema(image),
      draft: boolean().optional().default(false),
    }),
});

export const collections = {
  pages: pageCollection,
  links: linkCollection,
  jobs: jobCollection,
  posts: postCollection,
  skills: skillCollection,
};
