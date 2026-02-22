interface MovesBarProps {
  moves: number;
  maxMoves: number;
}

export default function MovesBar({ moves, maxMoves }: MovesBarProps) {
  // Barra começa cheia e vai diminuindo
  const remaining = maxMoves - moves;
  const percentage = Math.max((remaining / maxMoves) * 100, 0);

  // Cor muda: verde (cheio) → amarelo (metade) → vermelho (crítico)
  const barBg =
    percentage > 50 ? "#22C55E" : percentage > 25 ? "#FFDE00" : "#ef4444";

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {/* Label */}
      <span
        className="text-xs sm:text-sm font-bold text-[#FFDE00] shrink-0"
        style={{ textShadow: "1px 1px 0 #000" }}
      >
        MOVES
      </span>

      {/* Bar */}
      <div className="xp-bar-track flex-1">
        <div
          className="xp-bar-fill"
          style={{
            width: `${percentage}%`,
            background: barBg,
          }}
        />
      </div>

      {/* Counter */}
      <span
        className="text-xs sm:text-sm tabular-nums text-[#8B94B6] shrink-0"
        style={{ textShadow: "1px 1px 0 #000" }}
      >
        {remaining} <span className="text-[#4a5a99]">/</span> {maxMoves}
      </span>
    </div>
  );
}
