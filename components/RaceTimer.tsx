"use client";

import { RaceSummary } from "@/types/races";
import { useEffect, useState } from "react";

interface RaceTimerProps {
  race: RaceSummary;
}

export function RaceTimer({ race }: RaceTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<string>("");

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = Math.floor(Date.now() / 1000);
      const raceTime = race.advertised_start.seconds;
      const diff = raceTime - now;

      if (diff <= 0) {
        return "Started";
      }

      const minutes = Math.floor(diff / 60);
      const seconds = diff % 60;

      if (minutes === 0) {
        return `${seconds}s`;
      }

      return `${minutes}m ${seconds}s`;
    };

    setTimeRemaining(calculateTimeRemaining());

    const interval = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 1000);

    return () => clearInterval(interval);
  }, [race.advertised_start.seconds]);

  return (
    <span className="text-xs font-bold text-primary-light bg-primary-dark/20 px-2 py-1 rounded leading-none">
      {timeRemaining}
    </span>
  );
}
