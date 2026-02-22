"use client";

import type { Difficulty } from "@/hooks/useGameLogic";
import { DIFFICULTY_MOVES } from "@/hooks/useGameLogic";
import type { AllStats } from "@/hooks/useWinCounter";
import { TrophyIcon } from "./PixelIcons";

interface DifficultySelectorProps {
  current: Difficulty;
  onChange: (d: Difficulty) => void;
  stats: AllStats;
}

const LABELS: Record<Difficulty, string> = {
  easy: "FÁCIL",
  medium: "MÉDIO",
  hard: "DIFÍCIL",
};

const COLORS: Record<Difficulty, { bg: string; border: string; glow: string }> =
  {
    easy: {
      bg: "from-[#16a34a] to-[#15803d]",
      border: "border-[#4ade80]",
      glow: "rgba(34,197,94,0.3)",
    },
    medium: {
      bg: "from-[#d97706] to-[#b45309]",
      border: "border-[#fbbf24]",
      glow: "rgba(234,179,8,0.3)",
    },
    hard: {
      bg: "from-[#dc2626] to-[#b91c1c]",
      border: "border-[#f87171]",
      glow: "rgba(239,68,68,0.3)",
    },
  };

const difficulties: Difficulty[] = ["easy", "medium", "hard"];

export default function DifficultySelector({
  current,
  onChange,
  stats,
}: DifficultySelectorProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <span
        className="text-[10px] sm:text-xs font-bold text-[#8b9fd4] tracking-widest"
        style={{ textShadow: "1px 1px 0 #000" }}
      >
        DIFICULDADE
      </span>
      <div className="flex gap-2 sm:gap-3">
        {difficulties.map((d) => {
          const active = current === d;
          const c = COLORS[d];
          return (
            <button
              key={d}
              onClick={() => onChange(d)}
              className={`
                relative flex flex-col items-center gap-1
                bg-linear-to-b ${c.bg}
                text-white font-bold text-[9px] sm:text-[11px]
                px-3 sm:px-5 py-2 sm:py-2.5
                rounded-xl
                border-2 ${active ? c.border : "border-[#2a3460]"}
                hover:scale-105
                active:translate-y-[1px]
                transition-all
                cursor-pointer
              `}
              style={{
                boxShadow: active
                  ? `0 0 12px ${c.glow}, 0 3px 0 #0c0e1a`
                  : "0 3px 0 #0c0e1a",
                textShadow: "1px 1px 0 rgba(0,0,0,0.5)",
              }}
            >
              <span className="tracking-wider">{LABELS[d]}</span>
              <span className="text-[7px] sm:text-[8px] opacity-70">
                {DIFFICULTY_MOVES[d]} moves
              </span>
              {/* Win counter badge */}
              {stats[d].wins > 0 && (
                <div className="absolute -top-2 -right-2 flex items-center gap-0.5 bg-[#1a2040] border border-[#4a5a99] rounded-full px-1.5 py-0.5">
                  <TrophyIcon size={8} />
                  <span className="text-[7px] text-[#FFDE00] font-bold">
                    {stats[d].wins}
                  </span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
