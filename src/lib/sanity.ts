import { createClient, type SanityClient } from '@sanity/client';
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from '$env/static/public';

const projectId = PUBLIC_SANITY_PROJECT_ID;
const dataset = PUBLIC_SANITY_DATASET || 'production';

/** Read-only client, safe for the browser. */
export const sanity: SanityClient = createClient({
	projectId,
	dataset,
	apiVersion: '2024-01-01',
	useCdn: true
});

/** Build a URL for a Sanity image asset reference. */
export function imageUrl(ref?: string, width = 1200): string | null {
	if (!ref) return null;
	// asset ref looks like: image-<id>-<w>x<h>-<ext>
	const [, id, dimensions, ext] = ref.split('-');
	if (!id || !dimensions || !ext) return null;
	return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${ext}?w=${width}&auto=format&fit=max`;
}
