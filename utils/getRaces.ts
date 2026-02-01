import { ApiResponse, CategoryId, LiveRace } from "@/types/races";

interface Props {
  data?: ApiResponse;
  selectedCategory: CategoryId | null;
  liveRaces: LiveRace[];
}

export function getRaces({ data, selectedCategory, liveRaces }: Props) {
  if (!data) {
    return [];
  }
  const { next_to_go_ids } = data.data ?? {};

  const filteredRaceIds = selectedCategory
    ? next_to_go_ids.filter((raceId) => {
        const race = data.data.race_summaries[raceId];
        return race?.category_id === selectedCategory;
      })
    : next_to_go_ids;

  const upcomingRaces = filteredRaceIds.map(
    (raceId) => data.data.race_summaries[raceId],
  );

  // Create set of live race IDs for deduplication
  const liveRaceIds = new Set(liveRaces.map((lr) => lr.race.race_id));

  // Remove races from upcoming that are already in live races (use Redux version)
  const filteredUpcoming = upcomingRaces.filter(
    (race) => !liveRaceIds.has(race.race_id),
  );

  // Filter live races by selected category
  const filteredLiveRaces = selectedCategory
    ? liveRaces.filter((lr) => lr.race.category_id === selectedCategory)
    : liveRaces;

  const sortedUpcoming = [...filteredUpcoming].sort(
    (a, b) => a.advertised_start.seconds - b.advertised_start.seconds,
  );

  const combined = [
    ...filteredLiveRaces.map((lr) => lr.race),
    ...sortedUpcoming,
  ];

  return combined.slice(0, 5);
}
