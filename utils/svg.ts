export function roundPathData (pathD: string): string {
  return pathD.replace(/[-+]?[0-9]*\.?[0-9]+/g, roundToInteger)
}

