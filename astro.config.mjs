import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel/serverless';

// https://astro.build/config
export default defineConfig({
  site: 'https://prajolkharel.vercel.app',
  integrations: [tailwind(), mdx(), markdoc(), react(), keystatic()],

  output: 'hybrid',
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
