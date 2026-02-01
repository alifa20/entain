"use client";

import { useRaceData } from "@/hooks/useRaceData";
import { useAppSelector } from "@/lib/store";
import { selectLastChecked } from "@/lib/store/metadataSlice";
import RaceCardSkeleton from "./RaceCardSkeleton";
import { RaceCard } from "./RaceCard";
import RefreshCountdown from "./RefreshCountdown";

export function RaceCardList() {
  const { data, isLoading, error } = useRaceData();
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
      {/* Next Refresh Info */}
      <div className="flex items-center gap-2 text-sm text-text-secondary">
        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
          update
        </span>
        {/* <span>Next refresh: {formatNextRefresh()}</span> */}
        <RefreshCountdown />
      </div>

      {/* Race Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {data.map((race) => (
          <RaceCard key={race.race_id} race={race} />
        ))}
      </div>
    </div>
  );
}
