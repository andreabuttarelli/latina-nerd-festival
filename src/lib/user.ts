import { browser } from '$app/environment';

const KEY = 'lnf_anon_id';

/** Get (or lazily create) a stable anonymous id for this device. */
export function getAnonId(): string {
	if (!browser) return '';
	let id = localStorage.getItem(KEY);
	if (!id) {
		id = crypto.randomUUID();
		localStorage.setItem(KEY, id);
	}
	return id;
}
