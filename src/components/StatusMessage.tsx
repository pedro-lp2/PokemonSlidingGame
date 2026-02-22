import type { GameStatus } from "@/hooks/useGameLogic";
import { LightningIcon, BrokenHeartIcon } from "./PixelIcons";

interface StatusMessageProps {
  status: GameStatus;
}

export default function StatusMessage({ status }: StatusMessageProps) {
  if (status === "playing") return null;

  const isWin = status === "won";

  return (
    <div className="animate-slide-up">
      <div
        className={`rounded-2xl px-8 sm:px-12 py-4 sm:py-5 text-center border-2 ${
          isWin
            ? "bg-[#0a2a16]/90 border-[#22C55E]/50"
            : "bg-[#2a0a0a]/90 border-[#EF4444]/50"
        }`}
        style={{
          boxShadow: isWin
            ? "0 0 20px rgba(34,197,94,0.15)"
            : "0 0 20px rgba(239,68,68,0.15)",
        }}
      >
        <p
          className={`text-sm sm:text-base font-bold flex items-center justify-center gap-2 ${
            isWin ? "text-[#4ade80]" : "text-[#f87171]"
          }`}
          style={{ textShadow: "2px 2px 0 #000" }}
        >
          {isWin ? (
            <>
              <LightningIcon size={18} /> Você venceu a batalha!
            </>
          ) : (
            <>
              <BrokenHeartIcon size={18} /> Sem movimentos!
            </>
          )}
        </p>
        <p className="text-[10px] sm:text-xs text-[#7b8cc4] mt-2">
          {isWin ? "Parabéns, Treinador!" : "Tente novamente!"}
        </p>
      </div>
    </div>
  );
}
