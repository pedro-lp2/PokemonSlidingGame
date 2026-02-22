"use client";

import { useRef, useState, useCallback, useEffect } from "react";

const MUTE_KEY = "pokemon-puzzle-muted";

export function useSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const winAudioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio("/slidingGame-slideRock.mp3");
    audioRef.current.preload = "auto";
    winAudioRef.current = new Audio("/WinSound.wav");
    winAudioRef.current.preload = "auto";
    const stored = localStorage.getItem(MUTE_KEY);
    if (stored === "true") setMuted(true);
  }, []);

  const playSwap = useCallback(() => {
    if (muted || !audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, [muted]);

  const playWin = useCallback(() => {
    if (muted || !winAudioRef.current) return;
    winAudioRef.current.currentTime = 0;
    winAudioRef.current.play().catch(() => {});
  }, [muted]);

  const toggleMute = useCallback(() => {
    setMuted((prev) => {
      const next = !prev;
      localStorage.setItem(MUTE_KEY, String(next));
      return next;
    });
  }, []);

  return { muted, toggleMute, playSwap, playWin };
}
