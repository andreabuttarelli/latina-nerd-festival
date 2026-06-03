import { sanity } from '$lib/sanity';
import { missionsQuery } from '$lib/queries';
import { fallbackMissions } from '$lib/fallback';
import type { Mission } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		const missions = await sanity.fetch<Mission[]>(missionsQuery);
		return { missions: missions?.length ? missions : fallbackMissions };
	} catch {
		return { missions: fallbackMissions };
	}
};
