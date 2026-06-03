import { createClient } from '@sanity/client';
import { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } from '$env/static/public';
import { SANITY_WRITE_TOKEN } from '$env/static/private';

/** Server-only client with write access. NEVER import this in client code. */
export const sanityWrite = createClient({
	projectId: PUBLIC_SANITY_PROJECT_ID,
	dataset: PUBLIC_SANITY_DATASET || 'production',
	apiVersion: '2024-01-01',
	token: SANITY_WRITE_TOKEN,
	useCdn: false
});
