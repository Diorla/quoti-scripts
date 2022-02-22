export default function isRightInterval(
  difference: number,
  frequencyValue: number
): boolean {
  return !(difference % frequencyValue);
}
