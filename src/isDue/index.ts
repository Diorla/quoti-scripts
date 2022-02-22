import dayjs from "dayjs";
import DateType from "../interfaces/DateType";
import FrequencyType from "../interfaces/FrequencyType";
import isRightInterval from "./isRightInterval";

/**
 * Confirm if the task is due based on the start date and current date
 * @param  startDate the first date of the task
 * @param currentDate Today's date
 * @param frequencyType whether it is daily, weekly, monthly or yearly
 * @param frequencyValue every x days, weeks, months or years
 * @param dayOfWeek days of the week, 0 to 6, for weekly activity
 * @returns {boolean} true or false
 * @example isDue(new Date(), new Date(), "D", 1, []) // true
 */
export default function isDue(
  startDate: DateType,
  currentDate: DateType,
  frequencyType: FrequencyType,
  frequencyValue: number,
  dayOfWeek: number[] = []
): boolean {
  // daily check
  if (frequencyType === "D")
    return isRightInterval(
      dayjs(currentDate).diff(startDate, "d"),
      frequencyValue
    );

  // weekly check
  if (frequencyType === "W") {
    const isTheWeek = isRightInterval(
      dayjs(currentDate).diff(startDate, "w"),
      frequencyValue
    );

    return isTheWeek && dayOfWeek.includes(dayjs().day());
  }

  // monthly check
  if (frequencyType === "M") {
    const isThisMonth = isRightInterval(
      dayjs(currentDate).diff(startDate, "m"),
      frequencyValue
    );
    const date = dayjs(startDate).date();
    return isThisMonth && date === dayjs(currentDate).date();
  }

  // yearly check
  if (frequencyType === "Y") {
    const isThisYear = isRightInterval(
      dayjs(currentDate).diff(startDate, "y"),
      frequencyValue
    );
    const date = dayjs(startDate).date();
    const startMonth = dayjs(startDate).month();
    const endMonth = dayjs(startDate).month();
    return (
      isThisYear &&
      date === dayjs(currentDate).date() &&
      startMonth === endMonth
    );
  }

  return false;
}
