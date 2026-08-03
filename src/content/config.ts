import { defineCollection, z } from 'astro:content';

/**
 * SECTIONS
 * Each file in src/content/sections/ is one modular section of the homepage
 * (hero, about, skills, contact...). Every section has a shared `order` +
 * `visible` pair so the admin can reorder / show / hide sections without
 * touching code. Fields specific to a section type are optional so one
 * schema can cover every section file.
 */
const sections = defineCollection({
  type: 'content',
  schema: z.object({
    order: z.number().default(0),
    visible: z.boolean().default(true),

    // --- hero ---
    eyebrow: z.string().optional(),
    heroImage: z.string().optional(), // optional override of the global avatar
    ctaButtons: z
      .array(z.object({ label: z.string(), url: z.string() }))
      .optional(),

    // --- about ---
    aboutTitle: z.string().optional(),
    aboutImage: z.string().optional(),
    values: z
      .array(z.object({ title: z.string(), description: z.string() }))
      .optional(),

    // --- skills ---
    skillGroups: z
      .array(
        z.object({
          groupName: z.string(),
          items: z.array(z.string()),
        })
      )
      .optional(),

    // --- projects (homepage teaser section) ---
    projectsTitle: z.string().optional(),
    projectsSubtitle: z.string().optional(),

    // --- blog (homepage teaser section) ---
    blogTitle: z.string().optional(),
    blogSubtitle: z.string().optional(),

    // --- contact ---
    contactFormEndpoint: z.string().optional(),
  }),
});

/**
 * PROJECTS
 * One markdown file per project. Body markdown = long-form project write-up.
 */
const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
    liveUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    downloadFile: z.string().optional(), // e.g. a PDF report
    featured: z.boolean().default(false),
    visible: z.boolean().default(true),
    order: z.number().default(0),
  }),
});

/**
 * BLOG
 * One markdown file per post. Body markdown = article content.
 */
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.string().optional(),
    excerpt: z.string().optional(),
    coverImage: z.string().optional(),
    downloadFile: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

/**
 * SETTINGS
 * The single source of truth for site-wide identity: name, bio, email,
 * avatar, and social links. Hero/Contact/Footer all read from here so
 * there's one place to update your personal details, not several.
 */
const settings = defineCollection({
  type: 'data',
  schema: z.object({
    siteName: z.string(),
    fullName: z.string(),
    tagline: z.string().optional(), // short bio / headline
    email: z.string().email(),
    avatar: z.string().optional(), // profile photo, image upload
    favicon: z.string().optional(),
    footerText: z.string().optional(),
    resumeFile: z.string().optional(),
    socialLinks: z
      .array(
        z.object({
          platform: z.string(), // display label, e.g. "GitHub"
          icon: z
            .enum(['github', 'linkedin', 'twitter', 'strava', 'email', 'wca', 'globe'])
            .default('globe'),
          url: z.string(),
        })
      )
      .default([]),
  }),
});

export const collections = { sections, projects, blog, settings };
