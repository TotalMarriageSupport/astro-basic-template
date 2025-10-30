// @ts-check
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  output: "server",
trailingSlash:"always",
  adapter: node({
    mode: 'standalone'
  }),

  server: {
    host: '0.0.0.0'
},

  integrations: [react()]
});