import { defineType, defineField } from 'sanity';

export default defineType({
	name: 'mission',
	title: 'Missione',
	type: 'document',
	fields: [
		defineField({ name: 'title', title: 'Titolo missione', type: 'string', validation: (r) => r.required() }),
		defineField({
			name: 'slug',
			title: 'Slug (usato nel QR /app/m/<slug>)',
			type: 'slug',
			options: { source: 'title', maxLength: 60 },
			validation: (r) => r.required()
		}),
		defineField({ name: 'emoji', title: 'Emoji / Icona', type: 'string' }),
		defineField({ name: 'description', title: 'Descrizione (missione bloccata)', type: 'text', rows: 2 }),
		defineField({ name: 'achievementTitle', title: 'Titolo achievement (sbloccato)', type: 'string' }),
		defineField({ name: 'achievementDescription', title: 'Descrizione achievement', type: 'text', rows: 2 }),
		defineField({ name: 'points', title: 'Punti', type: 'number', initialValue: 10 })
	],
	preview: {
		select: { title: 'title', subtitle: 'slug.current', media: 'emoji' }
	}
});
