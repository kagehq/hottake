import LZString from "lz-string";

export const encodeState = (obj: unknown) =>
  LZString.compressToEncodedURIComponent(JSON.stringify(obj));

export const decodeState = <T=any>(s?: string|null): T | null => {
  if (!s) return null;
  try { return JSON.parse(LZString.decompressFromEncodedURIComponent(s) || "null") as T; }
  catch { return null; }
};
