"use client";

import { useRef, useState, useCallback } from "react";
import type { SwapAnim } from "@/hooks/useGameLogic";

interface PuzzleGridProps {
  label: string;
  tiles: number[];
  gridSize: number;
  images: string[];
  interactive?: boolean;
  correctPositions?: boolean[];
  swapAnim?: SwapAnim | null;
  swapDuration?: number;
  onSwap?: (from: number, to: number) => void;
}

export default function PuzzleGrid({
  label,
  tiles,
  gridSize,
  images,
  interactive = false,
  correctPositions,
  swapAnim,
  swapDuration = 280,
  onSwap,
}: PuzzleGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragFrom, setDragFrom] = useState<number | null>(null);

  const getIndexFromPoint = useCallback(
    (clientX: number, clientY: number): number => {
      if (!containerRef.current) return -1;
      const rect = containerRef.current.getBoundingClientRect();
      const relX = clientX - rect.left;
      const relY = clientY - rect.top;
      const cellW = rect.width / gridSize;
      const cellH = rect.height / gridSize;
      const col = Math.floor(relX / cellW);
      const row = Math.floor(relY / cellH);
      if (col < 0 || col >= gridSize || row < 0 || row >= gridSize) return -1;
      return row * gridSize + col;
    },
    [gridSize],
  );

  const handleStart = (index: number) => {
    if (!interactive) return;
    setDragFrom(index);
  };

  const handleEnd = (clientX: number, clientY: number) => {
    if (!interactive || dragFrom === null) return;
    const to = getIndexFromPoint(clientX, clientY);
    if (to >= 0 && to !== dragFrom) {
      onSwap?.(dragFrom, to);
    }
    setDragFrom(null);
  };

  const handleMouseUp = (e: React.MouseEvent) =>
    handleEnd(e.clientX, e.clientY);

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.changedTouches[0];
    if (touch) handleEnd(touch.clientX, touch.clientY);
  };

  const cellPercent = 100 / gridSize;

  const getSwapTransform = (index: number): string => {
    if (!swapAnim) return "translate(0, 0)";
    const { from, to } = swapAnim;
    if (index === from) {
      const dx = (to % gridSize) - (from % gridSize);
      const dy = Math.floor(to / gridSize) - Math.floor(from / gridSize);
      return `translate(${dx * 100}%, ${dy * 100}%)`;
    }
    if (index === to) {
      const dx = (from % gridSize) - (to % gridSize);
      const dy = Math.floor(from / gridSize) - Math.floor(to / gridSize);
      return `translate(${dx * 100}%, ${dy * 100}%)`;
    }
    return "translate(0, 0)";
  };

  const isSwapping = (index: number) =>
    swapAnim != null && (swapAnim.from === index || swapAnim.to === index);

  return (
    <div className="puzzle-panel flex flex-col w-full">
      {/* Label */}
      <div className="px-4 pt-3 pb-2">
        <h2
          className="text-xs sm:text-sm font-bold text-[#8b9fd4] text-center tracking-[0.25em]"
          style={{ textShadow: "1px 1px 0 rgba(0,0,0,0.6)" }}
        >
          {label}
        </h2>
      </div>

      {/* Grid container */}
      <div
        ref={containerRef}
        className={`relative w-full aspect-square bg-[#0c0e1a] overflow-hidden select-none mx-auto ${
          interactive ? "cursor-grab active:cursor-grabbing" : ""
        }`}
        style={{
          width: "calc(100% - 16px)",
          marginBottom: "8px",
          borderRadius: "8px",
          boxShadow: "inset 0 0 16px rgba(0,0,0,0.5)",
        }}
        onMouseUp={interactive ? handleMouseUp : undefined}
        onTouchEnd={interactive ? handleTouchEnd : undefined}
      >
        {tiles.map((tile, index) => {
          const col = index % gridSize;
          const row = Math.floor(index / gridSize);
          const correct = correctPositions?.[index] ?? false;
          const swapping = isSwapping(index);
          const isDragging = interactive && dragFrom === index;

          return (
            <div
              key={`tile-${index}`}
              className="absolute"
              style={{
                left: `${col * cellPercent}%`,
                top: `${row * cellPercent}%`,
                width: `${cellPercent}%`,
                height: `${cellPercent}%`,
                transform: getSwapTransform(index),
                transition: swapping
                  ? `transform ${swapDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`
                  : "none",
                zIndex: swapping ? 10 : isDragging ? 5 : 1,
              }}
              onMouseDown={() => handleStart(index)}
              onTouchStart={(e) => {
                e.preventDefault();
                handleStart(index);
              }}
            >
              <img
                src={images[tile - 1]}
                alt={`Peça ${tile}`}
                className="block w-full h-full object-cover pointer-events-none"
                draggable={false}
              />

              {correct && (
                <div className="absolute inset-[2px] pointer-events-none border-2 border-green-400 rounded-sm animate-correct-glow" />
              )}

              {!correct && (
                <div className="absolute inset-0 pointer-events-none border border-[#1a2240]/70" />
              )}

              {isDragging && (
                <div className="absolute inset-0 bg-white/15 pointer-events-none" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
