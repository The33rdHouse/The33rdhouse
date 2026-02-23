// Color mapping for gates (based on gate number)
export const gateColors: Record<number, string> = {
  1: "#9333ea", // purple
  2: "#ec4899", // pink
  3: "#f59e0b", // amber
  4: "#10b981", // emerald
  5: "#3b82f6", // blue
  6: "#8b5cf6", // violet
  7: "#ef4444", // red
  8: "#06b6d4", // cyan
  9: "#f97316", // orange
  10: "#14b8a6", // teal
  11: "#a855f7", // purple
  12: "#d946ef", // fuchsia
};

export function getGateColor(gateNumber: number): string {
  return gateColors[gateNumber] || "#9333ea";
}
