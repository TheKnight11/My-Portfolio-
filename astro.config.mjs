import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  site: 'https://your-site.vercel.app', // TODO: replace with your real Vercel URL
  integrations: [tailwind(), mdx(), markdoc(), react(), keystatic()],

  // Keystatic's admin UI (/keystatic) and its auth API routes (/api/keystatic/*)
  // need server-side code, so the site runs in "hybrid" mode: every page is
  // static/prerendered by default, except Keystatic's own routes, which the
  // keystatic() integration automatically marks as server-rendered.
  output: 'hybrid',
  adapter: vercel(),
});
