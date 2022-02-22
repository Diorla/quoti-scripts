import Chance from "chance";
import isRightInterval from "../src/isDue/isRightInterval";
import isDue from "../src/isDue";
import dayjs from "dayjs";
import "jest-extended";

describe("testing if the date is due", () => {
  const chance = new Chance();
  it("should test for intervals", () => {
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

  it("should test for daily test", () => {
    // it's basically intervals, so it will always return boolean
    // this is just to test the arguments
    const diff = chance.integer();
    const more = diff + chance.integer();

    const startDate = dayjs().subtract(more, "d");
    const compareDate = dayjs();
    expect(isDue(startDate, compareDate, "D", diff)).toBeBoolean();
  });

  it("should do weekly test", () => {
    const interval = chance.integer({ min: 0, max: 6 });
    const diff = chance.integer() + interval;
    const intervalTrue = isRightInterval(diff, interval);
    const today = dayjs().day();
    const weekdays = [chance.integer({ min: 0, max: 6 })];
    const weekdaysIncludesToday = weekdays.includes(today);

    /**
     * So for a week to be true, weekday must contain the day of the compare date
     * And the interval should match as well
     */
    expect(isDue(dayjs(), dayjs(), "W", interval, weekdays)).toBe(
      intervalTrue && weekdaysIncludesToday
    );
  });

  it("should test for monthly due date", () => {
    // intervals
    const interval = chance.integer();

    // Minimum number of days in a month
    const randomDate1 = chance.integer({ min: 1, max: 28 });
    const randomDate2 = chance.integer({ min: 1, max: 28 });

    // Most likely two different months
    const fullDate1 = chance.birthday();
    const fullDate2 = chance.birthday();

    // list of dates
    const initialDate = dayjs(fullDate1).date(randomDate1);
    const differentDate = dayjs(fullDate2).date(randomDate2);
    const sameDateDiffMonth = dayjs(fullDate2).date(randomDate1);

    // intervals is a match
    const intervalIsTrue = isRightInterval(
      dayjs(initialDate).diff(sameDateDiffMonth, "M"),
      interval
    );

    // True when the interval is right
    expect(isDue(initialDate, sameDateDiffMonth, "M", interval)).toBe(
      intervalIsTrue
    );
    // different date, always false
    expect(isDue(initialDate, differentDate, "M", interval)).toBe(false);
  });

  it("should test for yearly match", () => {
    // intervals
    const interval = chance.integer();

    // Minimum number of days in a month
    const randomDate1 = chance.integer({ min: 1, max: 27 });

    // Number of months in a year
    const randomMonth1 = chance.integer({ min: 1, max: 12 });
    const randomMonth2 = chance.integer({ min: 1, max: 12 });

    // Most likely two different months and date
    const fullDate = chance.birthday();

    // Various dates for testing
    const initialDate = dayjs(fullDate)
      .month(randomMonth1)
      .date(randomDate1);
    // Add 1 year to ensure it's the future
    const diffMonthSameDate = dayjs(fullDate)
      .month(randomMonth2)
      .date(randomDate1)
      .add(1, "year");
    const sameMonthDiffDate = dayjs(fullDate)
      .month(randomMonth1)
      .date(randomDate1 + 1)
      .add(1, "year");
    const diffDateMonth = dayjs(fullDate)
      .month(randomMonth2)
      .date(randomDate1 + 1)
      .add(1, "year");

    // intervals is a match
    const intervalIsTrue = isRightInterval(
      dayjs(initialDate).diff(diffMonthSameDate, "year"),
      interval
    );
    // different dates will always return false
    expect(isDue(initialDate, sameMonthDiffDate, "Y", interval)).toBe(false);
    expect(isDue(initialDate, diffDateMonth, "Y", interval)).toBe(false);

    // same date may return true
    expect(isDue(initialDate, diffMonthSameDate, "Y", interval)).toBe(
      intervalIsTrue && true
    );
  });
});
