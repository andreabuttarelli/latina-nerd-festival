import { defineType, defineField } from 'sanity';

/**
 * Per-device anonymous progress. Documents are created/updated by the
 * SvelteKit server endpoint (/api/unlock) using a write token.
 */
export default defineType({
	name: 'userProgress',
	title: 'Progresso utente',
	type: 'document',
	readOnly: true,
	fields: [
		defineField({ name: 'anonId', title: 'ID anonimo', type: 'string' }),
		defineField({
			name: 'unlocked',
			title: 'Missioni sbloccate',
			type: 'array',
			of: [{ type: 'reference', to: [{ type: 'mission' }] }]
		})
	],
	preview: {
		select: { title: 'anonId', unlocked: 'unlocked' },
		prepare({ title, unlocked }) {
			const n = Array.isArray(unlocked) ? unlocked.length : 0;
			return { title: title ?? 'anon', subtitle: `${n} missioni sbloccate` };
		}
	}
});
