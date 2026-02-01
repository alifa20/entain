"use client";

import { RaceSummary } from "@/types/races";
import { weatherIcon } from "@/utils/weatherIcon";
import { getCategoryInfo } from "@/utils/getCategoryInfo";
import { RaceDetails } from "./RaceDetails";
import { RaceTimer } from "./RaceTimer";

interface RaceCardProps {
  race?: RaceSummary;
}

export function RaceCard({ race }: RaceCardProps) {
  if (!race) {
    return null;
  }

  const categoryInfo = getCategoryInfo(race.category_id);

  return (
    <div className="bg-surface-dark rounded-xl border border-border-dark/30 overflow-hidden hover:border-border-dark transition-colors group flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border-dark/30 bg-[#232d38]">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between leading-none">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-wider leading-none">
              Race {race.race_number} • {race.race_form.distance}
              {race.race_form.distance_type.short_name}
            </span>
            <RaceTimer race={race} />
          </div>
          <h2 className="font-bold text-white text-lg leading-tight mt-2 min-h-12">
            {race.race_name}
          </h2>
        </div>
      </div>

      <div className="p-4 border-b border-border-dark/30 flex-1">
        <div className="flex items-start gap-3 ml-1">
          <div className="flex-1">
            <h3 className="font-semibold text-white text-sm mb-1">
              {race.venue_name}
            </h3>
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <span className="flex items-center gap-1">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 14 }}
                  aria-hidden="true"
                >
                  location_on
                </span>
                {race.venue_state}, {race.venue_country}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 14 }}
                  aria-hidden="true"
                >
                  {weatherIcon(race.race_form.weather?.icon_uri ?? "")}
                </span>
                {race.race_form.weather?.short_name}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 mb-3">
          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-semibold ${categoryInfo.color}`}
          >
            {categoryInfo.name}
          </span>
        </div>
        <div>
          <RaceDetails race={race} />
        </div>
      </div>
    </div>
  );
}
