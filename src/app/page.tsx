"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useGameLogic } from "@/hooks/useGameLogic";
import type { Difficulty } from "@/hooks/useGameLogic";
import { useImages } from "@/hooks/useImages";
import { useWinCounter } from "@/hooks/useWinCounter";
import { useSound } from "@/hooks/useSound";
import { useTimer } from "@/hooks/useTimer";
import GameTitle from "@/components/GameTitle";
import DifficultySelector from "@/components/DifficultySelector";
import MovesBar from "@/components/MovesBar";
import PuzzleGrid from "@/components/PuzzleGrid";
import StatusMessage from "@/components/StatusMessage";
import ResetButton from "@/components/ResetButton";
import Confetti from "@/components/Confetti";
import MuteButton from "@/components/MuteButton";
import StatsBar from "@/components/StatsBar";
import ConfirmModal from "@/components/ConfirmModal";
import { RefreshIcon } from "@/components/PixelIcons";

export default function PokemonPuzzle() {
  const { images, loaded } = useImages(9);
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const { stats, streak, addWin, onLoss, resetStreak } = useWinCounter();
  const { muted, toggleMute, playSwap, playWin } = useSound();
  const timer = useTimer();
  const [showConfetti, setShowConfetti] = useState(false);
  const prevStatusRef = useRef<string>("playing");
  const prevMovesRef = useRef(0);

  // Modal de confirmação de mudança de dificuldade
  const [pendingDifficulty, setPendingDifficulty] = useState<Difficulty | null>(
    null,
  );

  const {
    tiles,
    modelTiles,
    moves,
    maxMoves,
    gridSize,
    status,
    swapAnim,
    swapDuration,
    resetGame,
    shufflePuzzle,
    isCorrectPosition,
    trySwap,
  } = useGameLogic(difficulty);

  useEffect(() => {
    if (loaded && tiles.length === 0) {
      resetGame();
    }
  }, [loaded, tiles.length, resetGame]);

  // Inicia timer no primeiro movimento
  useEffect(() => {
    if (prevMovesRef.current === 0 && moves === 1) {
      timer.start();
    }
    prevMovesRef.current = moves;
  }, [moves, timer.start]);

  // Toca som quando um swap inicia
  useEffect(() => {
    if (swapAnim) {
      playSwap();
    }
  }, [swapAnim, playSwap]);

  // Registra vitória/derrota
  useEffect(() => {
    if (prevStatusRef.current === "playing" && status === "won") {
      timer.stop();
      addWin(difficulty, timer.elapsed);
      playWin();
      setShowConfetti(true);
      const t = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(t);
    }
    if (prevStatusRef.current === "playing" && status === "lost") {
      timer.stop();
      onLoss();
    }
    prevStatusRef.current = status;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, difficulty, addWin, onLoss, timer.stop, playWin]);

  // Tenta mudar dificuldade (com modal se tiver streak)
  const handleDifficultyChange = useCallback(
    (d: Difficulty) => {
      if (d === difficulty) return;
      if (streak >= 1) {
        setPendingDifficulty(d);
      } else {
        setDifficulty(d);
        setShowConfetti(false);
      }
    },
    [difficulty, streak],
  );

  const confirmDifficultyChange = useCallback(() => {
    if (pendingDifficulty) {
      resetStreak();
      setDifficulty(pendingDifficulty);
      setShowConfetti(false);
      setPendingDifficulty(null);
    }
  }, [pendingDifficulty, resetStreak]);

  const cancelDifficultyChange = useCallback(() => {
    setPendingDifficulty(null);
  }, []);

  // Reseta tudo quando muda dificuldade
  useEffect(() => {
    if (loaded) {
      resetGame();
      timer.reset();
      prevMovesRef.current = 0;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty, loaded, resetGame, timer.reset]);

  // Botão Resetar: reseta sessão e sequência
  const handleReset = useCallback(() => {
    resetGame();
    timer.reset();
    resetStreak();
    setShowConfetti(false);
    prevStatusRef.current = "playing";
    prevMovesRef.current = 0;
  }, [resetGame, timer.reset, resetStreak]);

  // Botão Embaralhar: mantém modelo, muda puzzle
  const handleShuffle = useCallback(() => {
    shufflePuzzle();
    timer.reset();
    prevStatusRef.current = "playing";
    prevMovesRef.current = 0;
  }, [shufflePuzzle, timer.reset]);

  if (!loaded) {
    return (
      <div className="min-h-screen bg-[#141827] flex flex-col items-center justify-center gap-4 pixel-font">
        <div className="w-12 h-12 border-4 border-[#FFDE00] border-t-transparent rounded-full animate-spin" />
        <p className="text-[#FFDE00] text-xs animate-pulse">Carregando...</p>
      </div>
    );
  }

  const correctPositions = tiles.map((_, i) => isCorrectPosition(i));

  return (
    <div className="min-h-screen bg-[#141827] flex flex-col items-center justify-center px-4 py-8 sm:py-10 pixel-font">
      <Confetti active={showConfetti} />
      <MuteButton muted={muted} onToggle={toggleMute} />
      <ConfirmModal
        open={pendingDifficulty !== null}
        streak={streak}
        onConfirm={confirmDifficultyChange}
        onCancel={cancelDifficultyChange}
      />

      {/* Título */}
      <div className="mb-5 sm:mb-6">
        <GameTitle />
      </div>

      {/* Seletor de Dificuldade */}
      <div className="mb-4 sm:mb-5">
        <DifficultySelector
          current={difficulty}
          onChange={handleDifficultyChange}
          stats={stats}
        />
      </div>

      {/* Timer + Streak + Best Time */}
      <div className="mb-4 sm:mb-5">
        <StatsBar
          elapsed={timer.elapsed}
          streak={streak}
          bestTime={stats[difficulty].bestTime}
        />
      </div>

      {/* Barra de Moves */}
      <div className="w-full max-w-[540px] mb-6 sm:mb-8">
        <MovesBar moves={moves} maxMoves={maxMoves} />
      </div>

      {/* Grids lado a lado */}
      <div className="flex flex-col sm:flex-row gap-5 sm:gap-8 w-full max-w-[620px] mb-6 sm:mb-8">
        <div className="flex-1 max-w-[300px] mx-auto sm:mx-0">
          <PuzzleGrid
            label="MODELO"
            tiles={modelTiles}
            gridSize={gridSize}
            images={images}
          />
        </div>
        <div className="flex-1 max-w-[300px] mx-auto sm:mx-0">
          <PuzzleGrid
            label="SEU PUZZLE"
            tiles={tiles}
            gridSize={gridSize}
            images={images}
            interactive
            correctPositions={correctPositions}
            swapAnim={swapAnim}
            swapDuration={swapDuration}
            onSwap={trySwap}
          />
        </div>
      </div>

      {/* Status */}
      <div className="mb-6 sm:mb-8">
        <StatusMessage status={status} />
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        {/* Embaralhar */}
        <button
          onClick={handleShuffle}
          className="
            bg-linear-to-b from-[#d97706] to-[#b45309]
            text-white font-bold text-sm sm:text-base
            px-6 sm:px-8 py-3 sm:py-4
            rounded-2xl
            border-3 border-[#fbbf24]
            hover:from-[#e5850a] hover:to-[#d97706]
            hover:scale-105
            active:translate-y-[2px] active:shadow-none active:scale-100
            transition-all tracking-wider
            cursor-pointer
            flex items-center gap-2
          "
          style={{
            boxShadow: "0 4px 0 #78350f, 0 6px 16px rgba(0,0,0,0.4)",
            textShadow: "2px 2px 0 rgba(0,0,0,0.5)",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            style={{ imageRendering: "pixelated" }}
          >
            <rect x="0" y="2" width="6" height="2" fill="currentColor" />
            <rect x="10" y="2" width="4" height="2" fill="currentColor" />
            <rect x="14" y="0" width="2" height="6" fill="currentColor" />
            <rect x="12" y="2" width="2" height="2" fill="currentColor" />
            <rect x="0" y="12" width="6" height="2" fill="currentColor" />
            <rect x="10" y="12" width="4" height="2" fill="currentColor" />
            <rect x="14" y="10" width="2" height="6" fill="currentColor" />
            <rect x="12" y="12" width="2" height="2" fill="currentColor" />
            <rect x="6" y="4" width="2" height="2" fill="currentColor" />
            <rect x="8" y="6" width="2" height="2" fill="currentColor" />
            <rect x="6" y="8" width="2" height="2" fill="currentColor" />
            <rect x="8" y="10" width="2" height="2" fill="currentColor" />
          </svg>
          EMBARALHAR
        </button>

        {/* Resetar */}
        <ResetButton onClick={handleReset} />
      </div>
    </div>
  );
}
