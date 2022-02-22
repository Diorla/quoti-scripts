import dayjs from 'dayjs';
import DateType from '../interfaces/DateType';
import FrequencyType from '../interfaces/FrequencyType';
import isRightInterval from './isRightInterval';

export default function isDue(
  startDate: DateType,
  compareDate: DateType,
  frequencyType: FrequencyType,
  frequencyValue: number,
  dayOfWeek: number[] = []
) {
  if (frequencyType === 'D')
    return isRightInterval(
      dayjs(compareDate).diff(startDate, 'd'),
      frequencyValue
    );
  if (frequencyType === 'W') {
    const isTheWeek = isRightInterval(
      dayjs(compareDate).diff(startDate, 'w'),
      frequencyValue
    );
    return isTheWeek && dayOfWeek.includes(dayjs().day());
  }
  return false;
}
