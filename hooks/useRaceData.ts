import { POLLING_INTERVAL } from "@/constants";
import { useGetNextRacesQuery } from "@/lib/services/api";
import { CategoryId, LiveRace } from "@/types/races";
import { getRaces } from "@/utils/getRaces";
import { useMemo } from "react";

export function useRaceData({
  selectedCategory,
  liveRaces,
}: {
  selectedCategory: CategoryId | null;
  liveRaces: LiveRace[];
}) {
  const {
    data: raw,
    isLoading,
    error,
  } = useGetNextRacesQuery(
    { count: 10 },
    { pollingInterval: POLLING_INTERVAL },
  );

  const data = useMemo(
    () => getRaces({ data: raw, selectedCategory, liveRaces }),
    [raw, selectedCategory, liveRaces],
  );

  return { data, isLoading, error };
}
