import { ApiResponse } from "@/types/races";

interface Props {
  data?: ApiResponse;
}

export function getRaces({ data }: Props) {
  if (!data) return [];

  const { next_to_go_ids = [], race_summaries } = data.data ?? {};

  const upcomingRaces =
    next_to_go_ids.map((raceId) => race_summaries[raceId])?.slice(0, 5) || [];

  const sortedUpcoming = [...upcomingRaces].sort(
    (a, b) => a.advertised_start.seconds - b.advertised_start.seconds,
  );
  return sortedUpcoming;
}
