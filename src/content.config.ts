import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

/* ================================================
 * Tools Collection: AI website builder review data
 * ================================================ */
const toolsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tools' }),
  schema: z.object({
      /* Basic Information */
      name: z.string(),
      slug: z.string(),
      logo: z.string().optional(),
      tagline: z.string(),

      /* Ratings (1-5 scale) */
      rating: z.number().min(1).max(5),
      ratingBreakdown: z.object({
        easeOfUse: z.number().min(1).max(5),
        features: z.number().min(1).max(5),
        pricing: z.number().min(1).max(5),
        seoFriendly: z.number().min(1).max(5),
      }),

      /* Pricing Information */
      price: z.object({
        freePlan: z.boolean(),
        startingPrice: z.number(),
        currency: z.string().default('USD'),
      }),

      /* Review Content */
      features: z.array(z.string()),
      pros: z.array(z.string()),
      cons: z.array(z.string()),
      bestFor: z.string(),

      /* Affiliate Information */
      affiliateLink: z.string().url(),

      /* Categories (for category page filtering) */
      categories: z.array(
        z.enum(['blog', 'ecommerce', 'portfolio', 'free'])
      ),

      /* Timestamps */
      datePublished: z.date(),
      dateModified: z.date(),

      /* Display Control */
      featured: z.boolean().default(false),
      // ── New fields added in Step 2 ──────────────────────────────────
      exportFormats: z.array(z.string()).optional(),
      hasApi: z.boolean().default(false),
      communitySize: z.number().optional(),
    }),
});

/* ================================================
 * Blog Collection: Blog articles
 * ================================================ */
const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    datePublished: z.date(),
    dateModified: z.date(),
    author: z.string().default('Editorial Team'),
  }),
});

export const collections = {
  'tools': toolsCollection,
  'blog': blogCollection,
};
