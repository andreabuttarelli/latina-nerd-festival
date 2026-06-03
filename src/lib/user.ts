import { browser } from '$app/environment';

const KEY = 'lnf_anon_id';
const ONBOARDED = 'lnf_onboarded';

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

/** Whether the user has completed (or skipped) the onboarding. */
export function hasOnboarded(): boolean {
	if (!browser) return true; // never gate during SSR
	return localStorage.getItem(ONBOARDED) === '1';
}

export function setOnboarded(): void {
	if (browser) localStorage.setItem(ONBOARDED, '1');
}
