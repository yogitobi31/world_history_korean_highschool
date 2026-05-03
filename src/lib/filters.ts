import { WorldHistoryEvent } from "@/types/worldHistory";

const ALL = "전체";

export type FilterValue = typeof ALL | WorldHistoryEvent["era"] | WorldHistoryEvent["region"];

export const FILTER_ALL = ALL;

export function getEras(events: WorldHistoryEvent[]) {
  return [ALL, ...new Set(events.map((event) => event.era))];
}

export function getRegions(events: WorldHistoryEvent[]) {
  return [ALL, ...new Set(events.map((event) => event.region))];
}

export function filterEvents(
  events: WorldHistoryEvent[],
  eraFilter: FilterValue,
  regionFilter: FilterValue,
  query: string
) {
  const normalizedQuery = query.toLowerCase().trim();

  return events.filter((event) => {
    const matchesEra = eraFilter === ALL || event.era === eraFilter;
    const matchesRegion = regionFilter === ALL || event.region === regionFilter;
    const haystack = [event.title, event.summary, event.dateLabel, event.keywords.join(" "), event.examPoints.join(" ")]
      .join(" ")
      .toLowerCase();
    const matchesQuery = !normalizedQuery || haystack.includes(normalizedQuery);

    return matchesEra && matchesRegion && matchesQuery;
  });
}
