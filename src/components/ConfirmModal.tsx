"use client";

interface ConfirmModalProps {
  open: boolean;
  streak: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({
  open,
  streak,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div
        className="relative puzzle-panel p-6 sm:p-8 max-w-sm w-full text-center animate-slide-up"
        style={{ boxShadow: "0 12px 40px rgba(0,0,0,0.6)" }}
      >
        {/* Warning icon */}
        <div className="flex justify-center mb-4">
          <svg
            width="32"
            height="32"
            viewBox="0 0 16 16"
            fill="none"
            style={{ imageRendering: "pixelated" }}
          >
            <rect x="6" y="0" width="4" height="2" fill="#FFDE00" />
            <rect x="4" y="2" width="8" height="2" fill="#FFDE00" />
            <rect x="2" y="4" width="12" height="2" fill="#FFDE00" />
            <rect x="2" y="6" width="12" height="2" fill="#FFA500" />
            <rect x="0" y="8" width="16" height="2" fill="#FFA500" />
            <rect x="0" y="10" width="16" height="2" fill="#FFDE00" />
            <rect x="0" y="12" width="16" height="2" fill="#FFDE00" />
            <rect x="0" y="14" width="16" height="2" fill="#FFA500" />
            {/* Exclamation */}
            <rect x="7" y="4" width="2" height="6" fill="#141827" />
            <rect x="7" y="12" width="2" height="2" fill="#141827" />
          </svg>
        </div>

        <p
          className="text-xs sm:text-sm font-bold text-[#FFDE00] mb-2"
          style={{ textShadow: "2px 2px 0 #000" }}
        >
          Atenção, Treinador!
        </p>

        <p className="text-[10px] sm:text-xs text-[#8b9fd4] mb-6 leading-relaxed">
          Você tem uma sequência de{" "}
          <span className="text-[#FFDE00] font-bold">{streak}</span> vitória
          {streak !== 1 ? "s" : ""} seguida{streak !== 1 ? "s" : ""}!
          <br />
          Se mudar a dificuldade, perderá a sequência.
        </p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="
              bg-linear-to-b from-[#3a4268] to-[#2a3460]
              text-[#8b9fd4] font-bold text-[10px] sm:text-xs
              px-6 py-2.5 rounded-xl
              border-2 border-[#4a5a99]
              hover:scale-105 active:translate-y-[1px]
              transition-all cursor-pointer
            "
            style={{ boxShadow: "0 3px 0 #0c0e1a" }}
          >
            CANCELAR
          </button>
          <button
            onClick={onConfirm}
            className="
              bg-linear-to-b from-[#dc2626] to-[#b91c1c]
              text-white font-bold text-[10px] sm:text-xs
              px-6 py-2.5 rounded-xl
              border-2 border-[#f87171]
              hover:scale-105 active:translate-y-[1px]
              transition-all cursor-pointer
            "
            style={{ boxShadow: "0 3px 0 #0c0e1a" }}
          >
            CONFIRMAR
          </button>
        </div>
      </div>
    </div>
  );
}
