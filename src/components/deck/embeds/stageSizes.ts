// next/image `sizes` for an element occupying `fraction` of the 1920×1080
// stage's width, so a stage scaled down to fit a smaller viewport requests
// an appropriately smaller image (research D12). 177.8vh approximates a
// 16:9-derived width from the viewport height.
export function stageSizes(fraction: number): string {
  const vw = Math.round(fraction * 100);
  const vh = Math.round(fraction * 177.8);
  return `(min-aspect-ratio: 16/9) ${vh}vh, ${vw}vw`;
}
