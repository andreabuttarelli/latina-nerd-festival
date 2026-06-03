import { sanity } from '$lib/sanity';
import { eventsQuery } from '$lib/queries';
import { fallbackEvents } from '$lib/fallback';
import type { FestivalEvent } from '$lib/types';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	try {
		const events = await sanity.fetch<FestivalEvent[]>(eventsQuery);
		return { events: events?.length ? events : fallbackEvents };
	} catch {
		return { events: fallbackEvents };
	}
};
