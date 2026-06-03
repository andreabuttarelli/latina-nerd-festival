import { defineType, defineField } from 'sanity';

const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

export default defineType({
	name: 'event',
	title: 'Evento (programma)',
	type: 'document',
	fields: [
		defineField({ name: 'title', title: 'Titolo', type: 'string', validation: (r) => r.required() }),
		defineField({ name: 'description', title: 'Descrizione', type: 'text', rows: 3 }),
		defineField({
			name: 'day',
			title: 'Giorno',
			type: 'date',
			options: { dateFormat: 'YYYY-MM-DD' },
			validation: (r) => r.required()
		}),
		defineField({
			name: 'startTime',
			title: 'Ora inizio (HH:mm)',
			type: 'string',
			validation: (r) => r.required().regex(timeRegex, { name: 'HH:mm' })
		}),
		defineField({
			name: 'endTime',
			title: 'Ora fine (HH:mm)',
			type: 'string',
			validation: (r) => r.regex(timeRegex, { name: 'HH:mm' })
		}),
		defineField({ name: 'stage', title: 'Palco / Sala', type: 'string' }),
		defineField({ name: 'speaker', title: 'Speaker / Tipo', type: 'string' })
	],
	orderings: [
		{
			title: 'Cronologico',
			name: 'chrono',
			by: [
				{ field: 'day', direction: 'asc' },
				{ field: 'startTime', direction: 'asc' }
			]
		}
	],
	preview: {
		select: { title: 'title', day: 'day', startTime: 'startTime', stage: 'stage' },
		prepare({ title, day, startTime, stage }) {
			return { title, subtitle: [day, startTime, stage].filter(Boolean).join(' · ') };
		}
	}
});
