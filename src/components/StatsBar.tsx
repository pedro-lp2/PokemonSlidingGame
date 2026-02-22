"use client";

import { formatTime } from "@/hooks/useTimer";
import { StarIcon, TrophyIcon } from "./PixelIcons";

interface StatsBarProps {
  elapsed: number;
  streak: number;
  bestTime: number | null;
}

export default function StatsBar({ elapsed, streak, bestTime }: StatsBarProps) {
  return (
    <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
      {/* Timer */}
      <div className="flex items-center gap-1.5">
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          style={{ imageRendering: "pixelated" }}
        >
          <rect x="4" y="0" width="4" height="2" fill="#8b9fd4" />
          <rect x="2" y="2" width="8" height="2" fill="#4a5a99" />
          <rect x="0" y="4" width="12" height="2" fill="#4a5a99" />
          <rect x="0" y="6" width="12" height="2" fill="#4a5a99" />
          <rect x="2" y="8" width="8" height="2" fill="#4a5a99" />
          <rect x="4" y="10" width="4" height="2" fill="#4a5a99" />
          {/* Hands */}
          <rect x="5" y="4" width="2" height="4" fill="#FFDE00" />
          <rect x="5" y="4" width="4" height="2" fill="#FFDE00" />
        </svg>
        <span
          className="text-[10px] sm:text-xs tabular-nums text-[#8b9fd4]"
          style={{ textShadow: "1px 1px 0 #000" }}
        >
          {formatTime(elapsed)}
        </span>
      </div>

      {/* Streak */}
      {streak > 0 && (
        <div className="flex items-center gap-1.5">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{ imageRendering: "pixelated" }}
          >
            <rect x="4" y="0" width="2" height="2" fill="#FFDE00" />
            <rect x="6" y="0" width="2" height="2" fill="#FFA500" />
            <rect x="2" y="2" width="2" height="2" fill="#FFDE00" />
            <rect x="4" y="2" width="2" height="2" fill="#FFA500" />
            <rect x="6" y="2" width="2" height="2" fill="#EF4444" />
            <rect x="8" y="2" width="2" height="2" fill="#FFA500" />
            <rect x="2" y="4" width="2" height="2" fill="#FFA500" />
            <rect x="4" y="4" width="4" height="2" fill="#EF4444" />
            <rect x="8" y="4" width="2" height="2" fill="#FFA500" />
            <rect x="2" y="6" width="2" height="2" fill="#EF4444" />
            <rect x="4" y="6" width="4" height="2" fill="#DC2626" />
            <rect x="8" y="6" width="2" height="2" fill="#EF4444" />
            <rect x="4" y="8" width="4" height="2" fill="#EF4444" />
            <rect x="4" y="10" width="4" height="2" fill="#DC2626" />
          </svg>
          <span
            className="text-[10px] sm:text-xs font-bold text-[#FFA500]"
            style={{ textShadow: "1px 1px 0 #000" }}
          >
            {streak}x
          </span>
        </div>
      )}

      {/* Best time */}
      {bestTime !== null && (
        <div className="flex items-center gap-1.5">
          <TrophyIcon size={12} />
          <span
            className="text-[10px] sm:text-xs tabular-nums text-[#FFDE00]"
            style={{ textShadow: "1px 1px 0 #000" }}
          >
            {formatTime(bestTime)}
          </span>
        </div>
      )}
    </div>
  );
}
