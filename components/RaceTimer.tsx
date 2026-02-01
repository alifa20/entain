"use client";

import { LIVE_RACE_DURATION_SECONDS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  addLiveRace,
  removeLiveRace,
  selectIsRaceLive,
  selectLiveRaceStartTime,
} from "@/lib/store/liveRacesSlice";
import { RaceSummary } from "@/types/races";
import { timer } from "@/utils/formatTime";
import { useEffect, useState } from "react";

interface RaceTimerProps {
  race: RaceSummary;
}

export function RaceTimer({ race }: RaceTimerProps) {
  const dispatch = useAppDispatch();
  const isLive = useAppSelector(selectIsRaceLive(race.race_id));
  const liveStartTime = useAppSelector(selectLiveRaceStartTime(race.race_id));

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    const updateTime = () => {
      const now = Math.floor(Date.now() / 1000);

      if (isLive && liveStartTime) {
        const elapsed = now - liveStartTime;
        setElapsedTime(elapsed);

        if (elapsed >= LIVE_RACE_DURATION_SECONDS) {
          dispatch(removeLiveRace(race.race_id));
        }
      } else {
        const remaining = race.advertised_start.seconds - now;
        const timeSinceStart = now - race.advertised_start.seconds;

        if (
          remaining <= 0 &&
          !isLive &&
          timeSinceStart < LIVE_RACE_DURATION_SECONDS
        ) {
          dispatch(addLiveRace(race));
          setTimeLeft(0);
        } else {
          setTimeLeft(remaining > 0 ? remaining : 0);
        }
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [race, isLive, liveStartTime, dispatch]);

  if (isLive) {
    return (
      <div className="flex items-center gap-1 text-white bg-green-600 px-2.5 py-1 rounded-lg whitespace-nowrap">
        <span
          className="material-symbols-outlined animate-pulse"
          style={{ fontSize: 16 }}
          aria-hidden="true"
        >
          play_circle
        </span>
        <span className="font-mono font-bold text-sm">
          {timer(elapsedTime)}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg whitespace-nowrap text-primary bg-transparent border border-primary/30`}
    >
      <span
        className="material-symbols-outlined"
        style={{ fontSize: 16 }}
        aria-hidden="true"
      >
        timer
      </span>
      <span className="font-mono font-bold text-sm">{timer(timeLeft)}</span>
    </div>
  );
}
