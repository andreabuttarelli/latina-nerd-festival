import { sanity } from '$lib/sanity';
import { festivalQuery } from '$lib/queries';
import { fallbackFestival } from '$lib/fallback';
import type { Festival } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		const festival = await sanity.fetch<Festival>(festivalQuery);
		return { festival: festival ?? fallbackFestival };
	} catch {
		return { festival: fallbackFestival };
	}
};
