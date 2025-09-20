export type TierKey = "S" | "A" | "B" | "C" | "F";
export const DEFAULT_TIERS: TierKey[] = ["S","A","B","C","F"];

export type Tile = {
  id: string;
  label: string;
  img?: string;  // data URL or absolute URL
};

export type TierState = {
  tiers: TierKey[];
  placement: Record<TierKey, string[]>; // item ids per tier
  items: Record<string, Tile>;          // id -> tile
  title?: string;
  v: number; // version
};
