"use client";

import { useRaceData } from "@/hooks/useRaceData";
import { useAppSelector } from "@/lib/store";
import { selectCategory } from "@/lib/store/categorySlice";
import { selectLiveRaces } from "@/lib/store/liveRacesSlice";
import { RaceCard } from "./RaceCard";
import RaceCardSkeleton from "./RaceCardSkeleton";

export function RaceCardList() {
  const selectedCategory = useAppSelector(selectCategory);
  const liveRaces = useAppSelector(selectLiveRaces);

  const { data, isLoading, error } = useRaceData({
    selectedCategory,
    liveRaces,
  });
  //   const lastChecked = useAppSelector(selectLastChecked);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        <RaceCardSkeleton />
        <RaceCardSkeleton />
        <RaceCardSkeleton />
        <RaceCardSkeleton />
        <RaceCardSkeleton />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error loading races</div>;
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {data.map((race) => (
          <RaceCard key={race.race_id} race={race} />
        ))}
      </div>
    </div>
  );
}
