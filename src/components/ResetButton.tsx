import { RefreshIcon } from "./PixelIcons";

interface ResetButtonProps {
  onClick: () => void;
}

export default function ResetButton({ onClick }: ResetButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
        bg-linear-to-b from-[#4c5fd6] to-[#3B4CCA]
        text-white font-bold text-sm sm:text-base
        px-10 sm:px-14 py-3 sm:py-4
        rounded-2xl
        border-3 border-[#FFDE00]
        hover:from-[#5a6ee0] hover:to-[#4c5fd6]
        hover:scale-105
        active:translate-y-[2px] active:shadow-none active:scale-100
        transition-all tracking-wider
        cursor-pointer
        flex items-center gap-2
      "
      style={{
        boxShadow: "0 4px 0 #1a2240, 0 6px 16px rgba(0,0,0,0.4)",
        textShadow: "2px 2px 0 rgba(0,0,0,0.5)",
      }}
    >
      <RefreshIcon size={14} /> RESETAR
    </button>
  );
}
