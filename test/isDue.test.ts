import Chance from 'chance';
import isRightInterval from '../src/isDue/isRightInterval';
import isDue from '../src/isDue';
import dayjs from 'dayjs';

describe('testing if the date is due', () => {
  const chance = new Chance();
  it('should test for intervals', () => {
    const diff = chance.integer({ min: 1, max: 10 });

    // precisely the same length of days
    expect(isRightInterval(diff, diff)).toBe(true);

    // multiples of twos
    expect(isRightInterval(diff * 2, 2)).toBe(true);

    // multiples of threes
    expect(isRightInterval(diff * 3, 3)).toBe(true);

    // even and odd numbers don't match
    expect(isRightInterval(diff * 2 + 1, 2)).toBe(false);
  });

  it('should test for daily test', () => {
    const diff = chance.integer();
    // isDue(startDate: DateType, compareDate: DateType, frequencyType: FrequencyType, frequencyValue: number, dayOfWeek?: number[])
    const startDate = dayjs().subtract(diff, 'd');
    const compareDate = dayjs();
    expect(isDue(startDate, compareDate, 'D', diff)).toBe(true);
  });
});
