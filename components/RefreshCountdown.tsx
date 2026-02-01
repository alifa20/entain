"use client";

import { useAppSelector } from "@/lib/store";
import { selectLastChecked } from "@/lib/store/metadataSlice";
import { formatTime } from "@/utils/formatTime";

export default function RefreshCountdown() {
  const lastChecked = useAppSelector(selectLastChecked);

  return (
    <div className="flex items-center gap-2 text-sm text-text-secondary">
      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
        update
      </span>

      <span>Last time checked:{formatTime(lastChecked)}</span>
    </div>
  );
}
