import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://bestaiwebsitebuilder.com',
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [
    react(),
    sitemap(),
  ],
  image: {
    /* Allow external image domains for tool logos */
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },
});
