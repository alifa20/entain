"use client";

import { RaceSummary } from "@/types/races";
import { weatherIcon } from "@/utils/weatherIcon";
import { RaceDetails } from "./RaceDetails";
import { RaceTimer } from "./RaceTimer";

interface RaceCardProps {
  race?: RaceSummary;
}

export function RaceCard({ race }: RaceCardProps) {
  if (!race) {
    return null;
  }

  return (
    <div className="bg-surface-dark rounded-xl border border-border-dark/30 overflow-hidden hover:border-border-dark transition-colors group flex flex-col h-full">
      {/* Card Header */}
      <div className="px-4 py-3 border-b border-border-dark/30 bg-[#232d38]">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-center justify-between leading-none">
            <span className="text-xs font-bold text-text-secondary uppercase tracking-wider leading-none">
              Race {race.race_number} • {race.race_form.distance}
              {race.race_form.distance_type.short_name}
            </span>
            {/* Timer Badge */}
            <RaceTimer race={race} />
          </div>
          <h3 className="font-bold text-white text-lg leading-tight mt-2 min-h-12">
            {race.race_name}
          </h3>
        </div>
      </div>

      {/* Race Info Section */}
      <div className="p-4 border-b border-border-dark/30 flex-1">
        <div className="flex items-start gap-3 ml-1">
          <div className="flex-1">
            <h4 className="font-semibold text-white text-sm mb-1">
              {race.venue_name}
            </h4>
            <div className="flex items-center gap-2 text-xs text-text-secondary">
              <span className="flex items-center gap-1">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 14 }}
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
                >
                  {weatherIcon(race.race_form.weather?.icon_uri ?? "")}
                </span>
                {race.race_form.weather?.short_name}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <RaceDetails race={race} />
        </div>
      </div>

      {/* Card Footer */}
      {/* <div className="bg-[#232d38]/50 p-3 border-t border-border-dark/30 flex justify-center">
        <button className="text-xs font-semibold text-text-secondary uppercase tracking-wide hover:text-white flex items-center gap-1 transition-colors">
          View Full Race{' '}
          <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
            arrow_forward
          </span>
        </button>
      </div> */}
    </div>
  );
}
