import { json, error } from '@sveltejs/kit';
import { sanityWrite } from '$lib/server/sanity';
import type { RequestHandler } from './$types';

/**
 * POST /api/unlock  { anonId, slug }
 * Validates the mission exists, then idempotently records it on the user's
 * progress document (created on first unlock). Returns the unlocked mission.
 */
export const POST: RequestHandler = async ({ request }) => {
	const { anonId, slug } = await request.json().catch(() => ({}));

	if (!anonId || typeof anonId !== 'string') throw error(400, 'Missing anonId');
	if (!slug || typeof slug !== 'string') throw error(400, 'Missing slug');

	const mission = await sanityWrite.fetch(
		`*[_type == "mission" && slug.current == $slug][0]{ _id, title, "slug": slug.current, emoji, achievementTitle, achievementDescription, points }`,
		{ slug }
	);
	if (!mission?._id) throw error(404, 'Missione non trovata');

	const docId = `progress.${anonId}`;

	// Already recorded? Then it's a no-op (idempotent).
	const alreadyUnlocked =
		(await sanityWrite.fetch(`count(*[_id == $docId && $missionId in unlocked[]._ref])`, {
			docId,
			missionId: mission._id
		})) > 0;

	if (!alreadyUnlocked) {
		await sanityWrite
			.transaction()
			.createIfNotExists({ _id: docId, _type: 'userProgress', anonId, unlocked: [] })
			.patch(docId, (p) =>
				p
					.setIfMissing({ unlocked: [] })
					.insert('after', 'unlocked[-1]', [
						{ _type: 'reference', _ref: mission._id, _key: mission._id }
					])
			)
			.commit({ visibility: 'async' });
	}

	return json({ mission, alreadyUnlocked });
};
