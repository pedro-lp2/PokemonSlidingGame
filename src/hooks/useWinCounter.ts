"use client";

import { useState, useCallback, useEffect } from "react";
import type { Difficulty } from "./useGameLogic";

const STORAGE_KEY = "pokemon-puzzle-stats";

interface DifficultyStats {
  wins: number;
  bestTime: number | null;
}

export interface AllStats {
  normal: DifficultyStats;
  hard: DifficultyStats;
}

const DEFAULT_STATS: AllStats = {
  normal: { wins: 0, bestTime: null },
  hard: { wins: 0, bestTime: null },
};

function loadStats(): AllStats {
  if (typeof window === "undefined") return DEFAULT_STATS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return DEFAULT_STATS;
    }
    const parsed = JSON.parse(raw);
    const read = (d: string): DifficultyStats => ({
      wins: typeof parsed[d]?.wins === "number" ? parsed[d].wins : 0,
      bestTime:
        typeof parsed[d]?.bestTime === "number" ? parsed[d].bestTime : null,
    });
    return { normal: read("normal"), hard: read("hard") };
  } catch {
    return DEFAULT_STATS;
  }
}

export function useWinCounter() {
  const [stats, setStats] = useState<AllStats>(DEFAULT_STATS);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setStats(loadStats());
  }, []);

  const addWin = useCallback((difficulty: Difficulty, timeMs: number) => {
    setStats((prev) => {
      const ds = prev[difficulty];
      const newBest =
        ds.bestTime === null ? timeMs : Math.min(ds.bestTime, timeMs);
      const next: AllStats = {
        ...prev,
        [difficulty]: { wins: ds.wins + 1, bestTime: newBest },
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
    setStreak((s) => s + 1);
  }, []);

  const onLoss = useCallback(() => {
    setStreak(0);
  }, []);

  const resetStreak = useCallback(() => {
    setStreak(0);
  }, []);

  return { stats, streak, addWin, onLoss, resetStreak };
}
