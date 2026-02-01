"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  selectIsRaceLive,
  selectLiveRaceStartTime,
  LIVE_RACE_DURATION_SECONDS,
  removeLiveRace,
  addLiveRace,
} from "@/lib/store/liveRacesSlice";
import { RaceSummary } from "@/types/races";
import { timer } from "@/utils/formatTime";
import { useEffect, useState } from "react";

interface RaceTimerProps {
  race: RaceSummary;
}

export function RaceTimer({ race }: RaceTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  // useEffect(() => {
  //   const calculateTimeRemaining = () => {
  //     const now = Math.floor(Date.now() / 1000);
  //     const raceTime = race.advertised_start.seconds;
  //     const diff = raceTime - now;

  //     if (diff <= 0) {
  //       return "Started";
  //     }

  //     const minutes = Math.floor(diff / 60);
  //     const seconds = diff % 60;

  //     if (minutes === 0) {
  //       return `${seconds}s`;
  //     }

  //     return `${minutes}m ${seconds}s`;
  //   };

  //   setTimeRemaining(calculateTimeRemaining());

  //   const interval = setInterval(() => {
  //     setTimeRemaining(calculateTimeRemaining());
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [race.advertised_start.seconds]);

  const dispatch = useAppDispatch();
  const isLive = useAppSelector(selectIsRaceLive(race.race_id));
  const liveStartTime = useAppSelector(selectLiveRaceStartTime(race.race_id));

  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    const updateTime = () => {
      const now = Math.floor(Date.now() / 1000);

      if (isLive && liveStartTime) {
        // Count-up timer for live races
        const elapsed = now - liveStartTime;
        setElapsedTime(elapsed);

        // SELF-CLEANUP: Remove from Redux after configured duration
        if (elapsed >= LIVE_RACE_DURATION_SECONDS) {
          dispatch(removeLiveRace(race.race_id));
        }
      } else {
        // Count-down timer for upcoming races
        const remaining = race.advertised_start.seconds - now;

        if (remaining <= 0 && !isLive) {
          // Timer just reached 0 - add to live races
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
    // <span className="text-xs font-bold text-primary-light bg-primary-dark/20 px-2 py-1 rounded leading-none">
    //   {timeRemaining}
    // </span>

    <div
      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg whitespace-nowrap text-primary bg-transparent border border-primary/30`}
    >
      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
        timer
      </span>
      <span className="font-mono font-bold text-sm">{timer(timeLeft)}</span>
    </div>
  );
}
