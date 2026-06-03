import { sanity } from '$lib/sanity';
import { missionBySlugQuery } from '$lib/queries';
import { fallbackMissions } from '$lib/fallback';
import type { Mission } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const slug = params.slug;
	let mission: Mission | null = null;
	try {
		mission = await sanity.fetch<Mission>(missionBySlugQuery, { slug });
	} catch {
		mission = null;
	}
	if (!mission) {
		mission = fallbackMissions.find((m) => m.slug === slug) ?? null;
	}
	return { slug, mission };
};
