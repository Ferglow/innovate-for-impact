import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const eventos = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/eventos' }),
	schema: z.object({
		city: z.string(),
		country: z.string(),
		date: z.string(),
		kicker: z.string().optional(),
		status: z.enum(['next', 'soon', 'past']),
		stats: z
			.array(
				z.object({
					value: z.string(),
					label: z.string(),
				})
			)
			.optional(),
		order: z.number().default(99),
	}),
});

export const collections = { eventos };
