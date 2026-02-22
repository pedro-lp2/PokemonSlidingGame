"use client";

interface MuteButtonProps {
  muted: boolean;
  onToggle: () => void;
}

export default function MuteButton({ muted, onToggle }: MuteButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="
        fixed top-4 right-4 z-50
        bg-[#1e2748] border-2 border-[#4a5a99]
        rounded-xl p-2.5
        hover:scale-110 active:scale-95
        transition-all cursor-pointer
      "
      style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.4)" }}
      title={muted ? "Ativar som" : "Desativar som"}
    >
      {muted ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 16 16"
          fill="none"
          style={{ imageRendering: "pixelated" }}
        >
          {/* Speaker body */}
          <rect x="0" y="4" width="2" height="8" fill="#EF4444" />
          <rect x="2" y="4" width="2" height="8" fill="#EF4444" />
          <rect x="4" y="2" width="2" height="12" fill="#EF4444" />
          <rect x="6" y="0" width="2" height="16" fill="#DC2626" />
          {/* X mark */}
          <rect x="10" y="4" width="2" height="2" fill="#EF4444" />
          <rect x="14" y="4" width="2" height="2" fill="#EF4444" />
          <rect x="12" y="6" width="2" height="2" fill="#EF4444" />
          <rect x="10" y="8" width="2" height="2" fill="#EF4444" />
          <rect x="14" y="8" width="2" height="2" fill="#EF4444" />
          <rect x="12" y="6" width="2" height="4" fill="#EF4444" />
        </svg>
      ) : (
        <svg
          width="18"
          height="18"
          viewBox="0 0 16 16"
          fill="none"
          style={{ imageRendering: "pixelated" }}
        >
          {/* Speaker body */}
          <rect x="0" y="4" width="2" height="8" fill="#8b9fd4" />
          <rect x="2" y="4" width="2" height="8" fill="#8b9fd4" />
          <rect x="4" y="2" width="2" height="12" fill="#8b9fd4" />
          <rect x="6" y="0" width="2" height="16" fill="#4a5a99" />
          {/* Sound waves */}
          <rect x="10" y="4" width="2" height="2" fill="#FFDE00" />
          <rect x="10" y="10" width="2" height="2" fill="#FFDE00" />
          <rect x="10" y="6" width="2" height="4" fill="#FFDE00" />
          <rect x="14" y="2" width="2" height="2" fill="#FFDE00" />
          <rect x="14" y="12" width="2" height="2" fill="#FFDE00" />
          <rect x="14" y="4" width="2" height="8" fill="#FFA500" />
        </svg>
      )}
    </button>
  );
}
