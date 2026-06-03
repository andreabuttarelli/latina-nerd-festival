/** GROQ queries, kept in one place. */

export const festivalQuery = /* groq */ `
*[_type == "festival"][0]{
  name, tagline, location, description,
  "startDate": startDate, "endDate": endDate,
  "heroImage": heroImage.asset._ref,
  highlights[]{ title, text },
  intro, welcomeTitle, nightLine,
  stats[]{ value, label },
  areas[]{ title, emoji },
  address, mapsUrl, openingHours, freeEntry,
  ticketUrl, ticketNote,
  partners[]{ name },
  instagram, tiktok, email, organizer
}`;

export const eventsQuery = /* groq */ `
*[_type == "event"] | order(day asc, startTime asc){
  _id, title, description, day, startTime, endTime, stage, speaker
}`;

export const missionsQuery = /* groq */ `
*[_type == "mission"] | order(points desc, title asc){
  _id, title, "slug": slug.current, emoji, description,
  achievementTitle, achievementDescription, points
}`;

export const missionBySlugQuery = /* groq */ `
*[_type == "mission" && slug.current == $slug][0]{
  _id, title, "slug": slug.current, emoji, description,
  achievementTitle, achievementDescription, points
}`;

/** Unlocked mission slugs for a given anonymous user. */
export const progressQuery = /* groq */ `
*[_type == "userProgress" && anonId == $anonId][0]{
  "unlocked": unlocked[]->slug.current
}`;
