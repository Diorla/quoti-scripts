export default function isWeeklyDue(
  weekDifference: number,
  frequencyValue: number
): boolean {
  return !(weekDifference % frequencyValue);
}
