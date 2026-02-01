"use client";

import { useAppSelector } from "@/lib/store";
import { selectLastChecked } from "@/lib/store/metadataSlice";
import { formatTime } from "@/utils/formatTime";

export default function RefreshCountdown() {
  const lastChecked = useAppSelector(selectLastChecked);

  return <span>Last time checked:{formatTime(lastChecked)}</span>;
}
