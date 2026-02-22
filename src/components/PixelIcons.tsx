// Ícones SVG pixel art para substituir emojis

export function LightningIcon({
  size = 16,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      style={{ imageRendering: "pixelated" }}
    >
      {/* Raio pixel art */}
      <rect x="8" y="0" width="2" height="2" fill="#FFDE00" />
      <rect x="6" y="2" width="4" height="2" fill="#FFDE00" />
      <rect x="4" y="4" width="6" height="2" fill="#FFDE00" />
      <rect x="6" y="6" width="6" height="2" fill="#FFDE00" />
      <rect x="8" y="8" width="4" height="2" fill="#FFDE00" />
      <rect x="6" y="10" width="4" height="2" fill="#FFA500" />
      <rect x="6" y="12" width="2" height="2" fill="#FFA500" />
      <rect x="6" y="14" width="2" height="2" fill="#FF8C00" />
    </svg>
  );
}

export function BrokenHeartIcon({
  size = 16,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      style={{ imageRendering: "pixelated" }}
    >
      {/* Coração partido pixel art */}
      <rect x="2" y="2" width="2" height="2" fill="#EF4444" />
      <rect x="4" y="2" width="2" height="2" fill="#EF4444" />
      <rect x="10" y="2" width="2" height="2" fill="#EF4444" />
      <rect x="12" y="2" width="2" height="2" fill="#EF4444" />
      <rect x="0" y="4" width="2" height="2" fill="#EF4444" />
      <rect x="2" y="4" width="2" height="2" fill="#F87171" />
      <rect x="4" y="4" width="2" height="2" fill="#EF4444" />
      <rect x="10" y="4" width="2" height="2" fill="#EF4444" />
      <rect x="12" y="4" width="2" height="2" fill="#F87171" />
      <rect x="14" y="4" width="2" height="2" fill="#EF4444" />
      <rect x="0" y="6" width="2" height="2" fill="#EF4444" />
      <rect x="2" y="6" width="4" height="2" fill="#EF4444" />
      <rect x="10" y="6" width="4" height="2" fill="#EF4444" />
      <rect x="14" y="6" width="2" height="2" fill="#EF4444" />
      {/* Racha no meio */}
      <rect x="6" y="4" width="2" height="2" fill="#141827" />
      <rect x="8" y="4" width="2" height="2" fill="#141827" />
      <rect x="6" y="6" width="2" height="2" fill="#141827" />
      <rect x="8" y="6" width="2" height="2" fill="#141827" />
      {/* Parte de baixo */}
      <rect x="2" y="8" width="4" height="2" fill="#EF4444" />
      <rect x="10" y="8" width="4" height="2" fill="#EF4444" />
      <rect x="4" y="10" width="2" height="2" fill="#DC2626" />
      <rect x="10" y="10" width="2" height="2" fill="#DC2626" />
    </svg>
  );
}

export function RefreshIcon({
  size = 16,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      style={{ imageRendering: "pixelated" }}
    >
      {/* Seta circular pixel art */}
      <rect x="4" y="0" width="6" height="2" fill="currentColor" />
      <rect x="10" y="0" width="2" height="2" fill="currentColor" />
      <rect x="12" y="0" width="2" height="2" fill="currentColor" />
      <rect x="2" y="2" width="2" height="2" fill="currentColor" />
      <rect x="12" y="2" width="2" height="2" fill="currentColor" />
      <rect x="0" y="4" width="2" height="2" fill="currentColor" />
      <rect x="14" y="4" width="2" height="2" fill="currentColor" />
      <rect x="0" y="6" width="2" height="2" fill="currentColor" />
      <rect x="0" y="8" width="2" height="2" fill="currentColor" />
      <rect x="2" y="10" width="2" height="2" fill="currentColor" />
      <rect x="4" y="12" width="6" height="2" fill="currentColor" />
      <rect x="14" y="8" width="2" height="2" fill="currentColor" />
      <rect x="12" y="10" width="2" height="2" fill="currentColor" />
      {/* Ponta da seta */}
      <rect x="12" y="4" width="2" height="2" fill="currentColor" />
      <rect x="14" y="2" width="2" height="4" fill="currentColor" />
    </svg>
  );
}

export function TrophyIcon({
  size = 14,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      className={className}
      style={{ imageRendering: "pixelated" }}
    >
      {/* Troféu pixel art */}
      <rect x="2" y="0" width="10" height="2" fill="#FFDE00" />
      <rect x="0" y="2" width="2" height="4" fill="#FFDE00" />
      <rect x="2" y="2" width="10" height="2" fill="#FFA500" />
      <rect x="12" y="2" width="2" height="4" fill="#FFDE00" />
      <rect x="2" y="4" width="10" height="2" fill="#FFDE00" />
      <rect x="2" y="6" width="2" height="2" fill="#FFDE00" />
      <rect x="10" y="6" width="2" height="2" fill="#FFDE00" />
      <rect x="4" y="6" width="6" height="2" fill="#FFA500" />
      <rect x="4" y="8" width="6" height="2" fill="#FFDE00" />
      <rect x="6" y="10" width="2" height="2" fill="#C0C0C0" />
      <rect x="4" y="12" width="6" height="2" fill="#C0C0C0" />
    </svg>
  );
}

export function StarIcon({
  size = 10,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 10 10"
      fill="none"
      className={className}
      style={{ imageRendering: "pixelated" }}
    >
      <rect x="4" y="0" width="2" height="2" fill="#FFDE00" />
      <rect x="2" y="2" width="6" height="2" fill="#FFDE00" />
      <rect x="0" y="4" width="10" height="2" fill="#FFDE00" />
      <rect x="2" y="6" width="2" height="2" fill="#FFA500" />
      <rect x="6" y="6" width="2" height="2" fill="#FFA500" />
      <rect x="0" y="8" width="2" height="2" fill="#FFA500" />
      <rect x="8" y="8" width="2" height="2" fill="#FFA500" />
    </svg>
  );
}
