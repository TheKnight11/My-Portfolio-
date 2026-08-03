import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel/serverless'; // ← the fix: subpath import, required by v7.x

export default defineConfig({
  site: 'https://prajolkharel.vercel.app',
  output: 'hybrid', // valid on Astro 4 — don't change this without upgrading Astro to 5/6
  integrations: [
    tailwind(),
    mdx(),
    markdoc(),
    react(),
    keystatic(),
  ],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
