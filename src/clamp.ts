/**
 * This is a function that makes sure that val is with a certain range
 * @param val the number
 * @param min the minimum possible numbers
 * @param max the maximum possible number
 * @returns returns the val if its greater than min and less than max, otherwise it will return min or max
 */
export default function clamp(val: number, min = 0, max = 100) {
  return Math.max(min, Math.min(val, max));
}
