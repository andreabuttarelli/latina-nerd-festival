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
		}),

		defineField({ name: 'intro', title: 'Intro (sito)', type: 'text', rows: 3 }),
		defineField({ name: 'welcomeTitle', title: 'Titolo benvenuto', type: 'string' }),
		defineField({ name: 'nightLine', title: 'Frase "Nerd Night"', type: 'string' }),
		defineField({
			name: 'stats',
			title: 'Numeri (stats)',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'value', title: 'Valore', type: 'string' },
						{ name: 'label', title: 'Etichetta', type: 'string' }
					]
				}
			]
		}),
		defineField({
			name: 'areas',
			title: 'Aree tematiche',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{ name: 'title', title: 'Titolo', type: 'string' },
						{ name: 'emoji', title: 'Emoji', type: 'string' }
					]
				}
			]
		}),
		defineField({ name: 'address', title: 'Indirizzo', type: 'string' }),
		defineField({ name: 'mapsUrl', title: 'Link Google Maps', type: 'url' }),
		defineField({ name: 'openingHours', title: 'Orari', type: 'string' }),
		defineField({ name: 'freeEntry', title: 'Ingresso gratuito', type: 'boolean', initialValue: true }),
		defineField({ name: 'ticketUrl', title: 'Link biglietti (Eventbrite)', type: 'url' }),
		defineField({ name: 'ticketNote', title: 'Nota biglietti', type: 'string' }),
		defineField({
			name: 'partners',
			title: 'Partner / Sponsor',
			type: 'array',
			of: [{ type: 'object', fields: [{ name: 'name', title: 'Nome', type: 'string' }] }]
		}),
		defineField({ name: 'instagram', title: 'Instagram URL', type: 'url' }),
		defineField({ name: 'tiktok', title: 'TikTok URL', type: 'url' }),
		defineField({ name: 'email', title: 'Email contatto', type: 'string' }),
		defineField({ name: 'organizer', title: 'Organizzatore', type: 'string' })
	],
	preview: {
		select: { title: 'name', subtitle: 'tagline' }
	}
});
