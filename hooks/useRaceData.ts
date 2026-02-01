import { POLLING_INTERVAL } from "@/constants";
import { useGetNextRacesQuery } from "@/lib/services/api";
import { getRaces } from "@/utils/getRaces";
import { useMemo } from "react";

export function useRaceData() {
  const {
    data: raw,
    isLoading,
    error,
  } = useGetNextRacesQuery(
    { count: 10 },
    { pollingInterval: POLLING_INTERVAL },
  );

  const data = useMemo(() => getRaces({ data: raw }), [raw]);

  return { data, isLoading, error };
}
