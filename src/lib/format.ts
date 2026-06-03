const MONTHS = [
	'gennaio',
	'febbraio',
	'marzo',
	'aprile',
	'maggio',
	'giugno',
	'luglio',
	'agosto',
	'settembre',
	'ottobre',
	'novembre',
	'dicembre'
];
const WEEKDAYS = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];

/** Parse an ISO date (YYYY-MM-DD) as a local date without timezone drift. */
export function parseDay(iso: string): Date {
	const [y, m, d] = iso.split('T')[0].split('-').map(Number);
	return new Date(y, (m || 1) - 1, d || 1);
}

/** "19 settembre" */
export function formatDayShort(iso?: string): string {
	if (!iso) return '';
	const d = parseDay(iso);
	return `${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

/** "Sabato 19 settembre" */
export function formatDayLong(iso?: string): string {
	if (!iso) return '';
	const d = parseDay(iso);
	const wd = WEEKDAYS[d.getDay()];
	return `${wd[0].toUpperCase()}${wd.slice(1)} ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

/** Date range like "19–20 settembre 2026". */
export function formatRange(start?: string, end?: string): string {
	if (!start) return '';
	const s = parseDay(start);
	if (!end) return `${s.getDate()} ${MONTHS[s.getMonth()]} ${s.getFullYear()}`;
	const e = parseDay(end);
	if (s.getMonth() === e.getMonth()) {
		return `${s.getDate()}–${e.getDate()} ${MONTHS[s.getMonth()]} ${e.getFullYear()}`;
	}
	return `${s.getDate()} ${MONTHS[s.getMonth()]} – ${e.getDate()} ${MONTHS[e.getMonth()]} ${e.getFullYear()}`;
}

/** Today's date as YYYY-MM-DD in local time. */
export function todayIso(): string {
	const d = new Date();
	const p = (n: number) => String(n).padStart(2, '0');
	return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}
