export function bytesToKBRounded(bytes: number, decimals: number = 2): number {
  const kb: number = bytes / 1000;
  return Math.round(kb * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
