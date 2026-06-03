/**
 * Sample content used when Sanity isn't configured yet (or returns empty),
 * so the app is fully navigable in development. Replace by populating Sanity.
 */
import type { Festival, FestivalEvent, Mission } from './types';

const D1 = '2026-09-19';
const D2 = '2026-09-20';

export const fallbackFestival: Festival = {
	name: 'Latina Nerd Festival',
	tagline: 'Due giorni di cultura nerd, giochi, scienza e community.',
	location: 'Latina',
	startDate: D1,
	endDate: D2,
	description:
		'Il festival che celebra tutto ciò che amiamo: videogiochi, fumetti, tecnologia, scienza e fantasia. Esplora il programma, scansiona i QR sparsi nell’evento e sblocca le tue missioni.',
	highlights: [
		{ title: 'Programma', text: 'Talk, tornei e panel su due giornate.' },
		{ title: 'Missioni', text: 'Scansiona i QR e colleziona achievement.' },
		{ title: 'Community', text: 'Incontra creator, artisti e appassionati.' }
	]
};

export const fallbackEvents: FestivalEvent[] = [
	{ _id: 'f1', day: D1, startTime: '10:00', endTime: '10:45', title: 'Apertura del festival', stage: 'Main Stage', description: 'Benvenuto e presentazione delle due giornate.' },
	{ _id: 'f2', day: D1, startTime: '11:00', endTime: '12:00', title: 'Il futuro dei videogiochi indie', stage: 'Sala Pixel', speaker: 'Panel', description: 'Sviluppatori a confronto sul panorama indie.' },
	{ _id: 'f3', day: D1, startTime: '12:30', endTime: '13:30', title: 'Torneo retrogaming', stage: 'Arcade', description: 'Sfide su cabinati storici.' },
	{ _id: 'f4', day: D1, startTime: '15:00', endTime: '16:00', title: 'AI & creatività', stage: 'Main Stage', speaker: 'Talk', description: 'Come l’intelligenza artificiale cambia l’arte.' },
	{ _id: 'f5', day: D1, startTime: '17:30', endTime: '18:30', title: 'Cosplay contest', stage: 'Main Stage', description: 'Sfilata e premiazione.' },
	{ _id: 'f6', day: D2, startTime: '10:30', endTime: '11:30', title: 'Fumetti: dall’idea alla tavola', stage: 'Sala Inchiostro', speaker: 'Workshop', description: 'Tecniche di disegno dal vivo.' },
	{ _id: 'f7', day: D2, startTime: '12:00', endTime: '13:00', title: 'Scienza spiegata male', stage: 'Main Stage', speaker: 'Talk', description: 'Divulgazione scientifica con ironia.' },
	{ _id: 'f8', day: D2, startTime: '15:00', endTime: '16:30', title: 'Finali tornei', stage: 'Arena', description: 'Le sfide decisive dei tornei del festival.' },
	{ _id: 'f9', day: D2, startTime: '18:00', endTime: '19:00', title: 'Cerimonia di chiusura', stage: 'Main Stage', description: 'Premiazioni e saluti finali.' }
];

export const fallbackMissions: Mission[] = [
	{ _id: 'm1', slug: 'esploratore', title: 'Esploratore', emoji: '🗺️', description: 'Trova il QR all’ingresso del festival.', achievementTitle: 'Benvenuto!', achievementDescription: 'Hai mosso i primi passi nel festival.', points: 10 },
	{ _id: 'm2', slug: 'gamer', title: 'Gamer', emoji: '🎮', description: 'Scansiona il QR alla zona arcade.', achievementTitle: 'Insert Coin', achievementDescription: 'Hai sbloccato la zona gaming.', points: 20 },
	{ _id: 'm3', slug: 'scienziato', title: 'Scienziato', emoji: '🔬', description: 'Trova il QR al talk di divulgazione.', achievementTitle: 'Eureka!', achievementDescription: 'La scienza è dalla tua parte.', points: 20 },
	{ _id: 'm4', slug: 'cosplayer', title: 'Cosplayer', emoji: '🦸', description: 'Scansiona il QR al cosplay contest.', achievementTitle: 'Trasformazione', achievementDescription: 'Hai assistito alla sfilata.', points: 30 },
	{ _id: 'm5', slug: 'maratoneta', title: 'Maratoneta', emoji: '🏆', description: 'Completa tutte le missioni.', achievementTitle: 'Leggenda del Festival', achievementDescription: 'Hai conquistato il Latina Nerd Festival!', points: 50 }
];
