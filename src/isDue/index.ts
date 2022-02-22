import dayjs from "dayjs";
import DateType from "../interfaces/DateType";
import FrequencyType from "../interfaces/FrequencyType";
import isRightInterval from "./isRightInterval";

export default function isDue(
  startDate: DateType,
  compareDate: DateType,
  frequencyType: FrequencyType,
  frequencyValue: number,
  dayOfWeek: number[] = []
) {
  // daily check
  if (frequencyType === "D")
    return isRightInterval(
      dayjs(compareDate).diff(startDate, "d"),
      frequencyValue
    );

  // weekly check
  if (frequencyType === "W") {
    const isTheWeek = isRightInterval(
      dayjs(compareDate).diff(startDate, "w"),
      frequencyValue
    );
    return isTheWeek && dayOfWeek.includes(dayjs().day());
  }

  // monthly check
  if (frequencyType === "M") {
    if ("development" === process.env.NODE_ENV) {
      console.log(
        startDate.toLocaleString(),
        compareDate.toLocaleString(),
        frequencyType,
        frequencyValue
      );
    }

    const isThisMonth = isRightInterval(
      dayjs(compareDate).diff(startDate, "m"),
      frequencyValue
    );
    const date = dayjs(startDate).date();
    return isThisMonth && date === dayjs(compareDate).date();
  }

  // yearly check
  if (frequencyType === "Y") {
    const isThisYear = isRightInterval(
      dayjs(compareDate).diff(startDate, "y"),
      frequencyValue
    );
    const date = dayjs(startDate).date();
    const startMonth = dayjs(startDate).month();
    const endMonth = dayjs(startDate).month();
    return (
      isThisYear &&
      date === dayjs(compareDate).date() &&
      startMonth === endMonth
    );
  }

  return false;
}
