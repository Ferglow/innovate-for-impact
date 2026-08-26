// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/config';

// https://astro.build/config
export default defineConfig({
	site: SITE_URL,
	i18n: {
		defaultLocale: 'es',
		locales: ['es', 'en'],
	},
	integrations: [sitemap()],
});
