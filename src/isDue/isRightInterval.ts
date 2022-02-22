/**
 * Evaluate to see if the interval matches
 * @param difference subtract start date from current date
 * @param frequencyValue every x days, weeks, months or years
 * @returns {boolean} true or false;
 */
export default function isRightInterval(
  difference: number,
  frequencyValue: number
): boolean {
  return !(difference % frequencyValue);
}
