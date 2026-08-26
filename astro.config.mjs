// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	site: 'https://innovate-for-impact-ferglow.netlify.app',
	i18n: {
		defaultLocale: 'es',
		locales: ['es', 'en'],
	},
	integrations: [sitemap()],
});
