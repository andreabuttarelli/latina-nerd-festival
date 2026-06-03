import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'festival',
	title: 'Festival',
	type: 'document',
	fields: [
		defineField({ name: 'name', title: 'Nome', type: 'string', validation: (r) => r.required() }),
		defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
		defineField({ name: 'startDate', title: 'Data inizio', type: 'date', options: { dateFormat: 'YYYY-MM-DD' } }),
		defineField({ name: 'endDate', title: 'Data fine', type: 'date', options: { dateFormat: 'YYYY-MM-DD' } }),
		defineField({ name: 'location', title: 'Luogo', type: 'string' }),
		defineField({ name: 'description', title: 'Descrizione', type: 'text', rows: 4 }),
		defineField({ name: 'heroImage', title: 'Immagine hero', type: 'image', options: { hotspot: true } }),
		defineField({
			name: 'highlights',
			title: 'Highlights (homepage)',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'title', title: 'Titolo', type: 'string' },
						{ name: 'text', title: 'Testo', type: 'string' }
					]
				}
			]
		})
	],
	preview: {
		select: { title: 'name', subtitle: 'tagline' }
	}
});
