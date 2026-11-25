export { cn } from "cn"

export function getDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.hypot(x2 - x1, y2 - y1)
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}
