"use client";

import { useState, useCallback, useRef, useEffect } from "react";

const GRID_SIZE = 3;
const TOTAL_TILES = GRID_SIZE * GRID_SIZE;
const SWAP_DURATION = 1000;

export type Difficulty = "easy" | "medium" | "hard";
export type GameStatus = "playing" | "won" | "lost";

export const DIFFICULTY_MOVES: Record<Difficulty, number> = {
  easy: 16,
  medium: 10,
  hard: 6,
};

export interface SwapAnim {
  from: number;
  to: number;
}

function shuffle(array: number[]): number[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function isAdjacent(i1: number, i2: number): boolean {
  const r1 = Math.floor(i1 / GRID_SIZE);
  const c1 = i1 % GRID_SIZE;
  const r2 = Math.floor(i2 / GRID_SIZE);
  const c2 = i2 % GRID_SIZE;
  return (
    (r1 === r2 && Math.abs(c1 - c2) === 1) ||
    (c1 === c2 && Math.abs(r1 - r2) === 1)
  );
}

export function useGameLogic(difficulty: Difficulty) {
  const maxMoves = DIFFICULTY_MOVES[difficulty];

  const [tiles, setTiles] = useState<number[]>([]);
  const [modelTiles, setModelTiles] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [status, setStatus] = useState<GameStatus>("playing");
  const [swapAnim, setSwapAnim] = useState<SwapAnim | null>(null);
  const animatingRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Checa vitória/derrota quando tiles ou moves mudam
  useEffect(() => {
    if (tiles.length === 0 || modelTiles.length === 0) return;
    if (status !== "playing") return;

    const won = tiles.every((tile, i) => tile === modelTiles[i]);
    if (won) {
      setStatus("won");
    } else if (moves >= maxMoves) {
      setStatus("lost");
    }
  }, [tiles, moves, modelTiles, status, maxMoves]);

  // Limpa timeout no unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const resetGame = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setTiles(shuffle(Array.from({ length: TOTAL_TILES }, (_, i) => i + 1)));
    setModelTiles(
      shuffle(Array.from({ length: TOTAL_TILES }, (_, i) => i + 1)),
    );
    setMoves(0);
    setStatus("playing");
    setSwapAnim(null);
    animatingRef.current = false;
  }, []);

  const shufflePuzzle = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setTiles(shuffle(Array.from({ length: TOTAL_TILES }, (_, i) => i + 1)));
    setMoves(0);
    setStatus("playing");
    setSwapAnim(null);
    animatingRef.current = false;
  }, []);

  const isCorrectPosition = useCallback(
    (index: number) => tiles[index] === modelTiles[index],
    [tiles, modelTiles],
  );

  const trySwap = useCallback(
    (fromIndex: number, toIndex: number) => {
      if (animatingRef.current) return;
      if (status !== "playing") return;
      if (fromIndex === toIndex) return;
      if (!isAdjacent(fromIndex, toIndex)) return;

      animatingRef.current = true;
      setSwapAnim({ from: fromIndex, to: toIndex });

      timeoutRef.current = setTimeout(() => {
        setTiles((prev) => {
          const next = [...prev];
          [next[fromIndex], next[toIndex]] = [next[toIndex], next[fromIndex]];
          return next;
        });
        setMoves((prev) => prev + 1);
        setSwapAnim(null);
        animatingRef.current = false;
      }, SWAP_DURATION);
    },
    [status],
  );

  return {
    tiles,
    modelTiles,
    moves,
    maxMoves,
    gridSize: GRID_SIZE,
    status,
    swapAnim,
    swapDuration: SWAP_DURATION,
    resetGame,
    shufflePuzzle,
    isCorrectPosition,
    trySwap,
  };
}
