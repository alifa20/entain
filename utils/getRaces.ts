import { LIVE_RACE_DURATION_SECONDS } from "@/constants";
import { ApiResponse, CategoryId, LiveRace } from "@/types/races";

interface Props {
  data?: ApiResponse;
  selectedCategory: CategoryId | null;
  liveRaces: LiveRace[];
}

export function getRaces({ data, selectedCategory, liveRaces }: Props) {
  if (!data?.data?.next_to_go_ids?.length) {
    return [];
  }

  const { next_to_go_ids } = data.data;
  const now = Math.floor(Date.now() / 1000);

  const filteredRaceIds = selectedCategory
    ? next_to_go_ids.filter((raceId) => {
        const race = data.data.race_summaries[raceId];
        return race?.category_id === selectedCategory;
      })
    : next_to_go_ids;

  const upcomingRaces = filteredRaceIds
    .map((raceId) => data.data.race_summaries[raceId])
    .filter((race) => {
      const timeSinceStart = now - race.advertised_start.seconds;
      // Sometimes the api keeps the record of races that has started for a couple of seconds, and we want to exclude those
      return timeSinceStart < 0;
    });

  const liveRaceIds = new Set(liveRaces.map((lr) => lr.race.race_id));
  const filteredUpcoming = upcomingRaces.filter(
    (race) => !liveRaceIds.has(race.race_id),
  );

  const filteredLiveRaces = liveRaces.filter((lr) => {
    const elapsed = now - lr.startedAt;

    if (elapsed >= LIVE_RACE_DURATION_SECONDS) {
      return false;
    }

    if (selectedCategory && lr.race.category_id !== selectedCategory) {
      return false;
    }

    return true;
  });

  const sortedUpcoming = [...filteredUpcoming].sort(
    (a, b) => a.advertised_start.seconds - b.advertised_start.seconds,
  );

  const combined = [
    ...filteredLiveRaces.map((lr) => lr.race),
    ...sortedUpcoming,
  ];

  return combined.slice(0, 5);
}
