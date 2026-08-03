import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import markdoc from '@astrojs/markdoc';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://prajolkharel.vercel.app',
  integrations: [tailwind(), mdx(), markdoc(), react(), keystatic()],
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
