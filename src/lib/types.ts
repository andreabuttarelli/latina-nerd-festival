export type Festival = {
	name: string;
	tagline?: string;
	startDate?: string;
	endDate?: string;
	location?: string;
	description?: string;
	heroImage?: string; // asset ref
	highlights?: { title: string; text?: string }[];
};

export type FestivalEvent = {
	_id: string;
	title: string;
	description?: string;
	day: string; // ISO date (YYYY-MM-DD)
	startTime?: string; // "HH:mm"
	endTime?: string; // "HH:mm"
	stage?: string;
	speaker?: string;
};

export type Mission = {
	_id: string;
	title: string;
	slug: string;
	emoji?: string;
	description?: string;
	achievementTitle?: string;
	achievementDescription?: string;
	points?: number;
};
