"use client";

import { useRef, useState, useCallback, useEffect } from "react";

const MUTE_KEY = "pokemon-puzzle-muted";
const VOLUME_KEY = "pokemon-puzzle-volume";

export function useSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const winAudioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    audioRef.current = new Audio("/slidingGame-slideRock.mp3");
    audioRef.current.preload = "auto";
    winAudioRef.current = new Audio("/WinSound.wav");
    winAudioRef.current.preload = "auto";
    
    const storedMute = localStorage.getItem(MUTE_KEY);
    if (storedMute === "true") setMuted(true);
    
    const storedVolume = localStorage.getItem(VOLUME_KEY);
    if (storedVolume) {
      const vol = parseFloat(storedVolume);
      if (!isNaN(vol) && vol >= 0 && vol <= 1) {
        setVolume(vol);
      }
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
    if (winAudioRef.current) winAudioRef.current.volume = volume;
  }, [volume]);

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

  const changeVolume = useCallback((newVolume: number) => {
    const vol = Math.max(0, Math.min(1, newVolume));
    setVolume(vol);
    localStorage.setItem(VOLUME_KEY, String(vol));
  }, []);

  return { muted, volume, toggleMute, changeVolume, playSwap, playWin };
}
