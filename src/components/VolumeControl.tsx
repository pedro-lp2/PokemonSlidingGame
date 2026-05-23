"use client";

import { useState } from "react";

interface VolumeControlProps {
  volume: number;
  muted: boolean;
  onVolumeChange: (volume: number) => void;
  onToggleMute: () => void;
  onUnmute?: () => void;
}

export default function VolumeControl({
  volume,
  muted,
  onVolumeChange,
  onToggleMute,
  onUnmute,
}: VolumeControlProps) {
  const [showSlider, setShowSlider] = useState(false);

  const volumePercent = Math.round(volume * 100);

  return (
    <div 
      className="fixed top-4 right-4 z-50"
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}
    >
      <div className="relative flex items-center gap-2">
        {/* Slider de volume */}
        {showSlider && (
          <div
            className="
              bg-linear-to-b from-[#2a3460] to-[#1a2040]
              border-2 border-[#4a5a99]
              rounded-xl
              px-4 py-3
              flex items-center gap-3
              animate-in fade-in slide-in-from-right-2
            "
            style={{
              boxShadow: "0 3px 0 #0c0e1a, 0 4px 8px rgba(0,0,0,0.4)",
            }}
          >
            <input
              type="range"
              min="0"
              max="100"
              value={volumePercent}
              onChange={(e) => onVolumeChange(parseInt(e.target.value) / 100)}
              className="
                w-32 h-2
                bg-[#1a2040]
                rounded-full
                appearance-none
                cursor-pointer
                [&::-webkit-slider-thumb]:appearance-none
                [&::-webkit-slider-thumb]:w-4
                [&::-webkit-slider-thumb]:h-4
                [&::-webkit-slider-thumb]:rounded-full
                [&::-webkit-slider-thumb]:bg-[#FFDE00]
                [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:border-2
                [&::-webkit-slider-thumb]:border-[#fbbf24]
                [&::-moz-range-thumb]:w-4
                [&::-moz-range-thumb]:h-4
                [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-[#FFDE00]
                [&::-moz-range-thumb]:cursor-pointer
                [&::-moz-range-thumb]:border-2
                [&::-moz-range-thumb]:border-[#fbbf24]
                [&::-moz-range-thumb]:border-none
              "
              style={{
                background: `linear-gradient(to right, #FFDE00 0%, #FFDE00 ${volumePercent}%, #1a2040 ${volumePercent}%, #1a2040 100%)`,
              }}
            />
            <span className="text-white text-xs font-bold min-w-[2rem]">
              {volumePercent}%
            </span>
          </div>
        )}

        {/* Botão principal */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            const wasMuted = muted;
            onToggleMute();
            if (wasMuted && onUnmute) {
              setTimeout(() => onUnmute(), 100);
            }
          }}
          className="
            bg-linear-to-b from-[#2a3460] to-[#1a2040]
            text-white font-bold
            w-12 h-12
            rounded-xl
            border-2 border-[#4a5a99]
            hover:border-[#FFDE00]
            hover:scale-110
            active:translate-y-[1px]
            transition-all
            cursor-pointer
            flex items-center justify-center
          "
          style={{
            boxShadow: "0 3px 0 #0c0e1a, 0 4px 8px rgba(0,0,0,0.4)",
            textShadow: "1px 1px 0 rgba(0,0,0,0.5)",
          }}
        >
          {muted ? (
            // Ícone de mute (alto-falante com X)
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 9h4l5-5v16l-5-5H3V9z" fill="currentColor" />
              <line x1="17" y1="7" x2="23" y2="13" stroke="#ff4444" strokeWidth="2" />
              <line x1="23" y1="7" x2="17" y2="13" stroke="#ff4444" strokeWidth="2" />
            </svg>
          ) : (
            // Ícone de som (alto-falante com ondas)
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M3 9h4l5-5v16l-5-5H3V9z" fill="currentColor" />
              <path d="M15 7c1.5 1.5 1.5 3.5 1.5 5s0 3.5-1.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M18 5c2.5 2.5 2.5 6.5 2.5 7s0 4.5-2.5 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
