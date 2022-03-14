import Chance from "chance";
import formatTime from "../src/formatTime";
describe("should test formatTime", () => {
  const chance = new Chance();
  it("should handle default time", () => {
    expect(formatTime({})).toEqual({ hh: 0, mm: 0, ss: 0, ms: 0 });
  });
  test("should convert milliseconds", () => {
    const ms = chance.integer({ min: 1, max: 999 });
    const ss = chance.integer({ min: 1, max: 59 });

    expect(formatTime({ ms: ms + ss * 1000 })).toEqual({
      hh: 0,
      mm: 0,
      ss,
      ms,
    });
  });
  test("should convert seconds", () => {
    const ss = chance.integer({ min: 1, max: 59 });
    const mm = chance.integer({ min: 1, max: 59 });

    expect(formatTime({ ss: ss + mm * 60 })).toEqual({
      hh: 0,
      mm,
      ss,
      ms: 0,
    });
  });
  test("should convert minutes", () => {
    const mm = chance.integer({ min: 1, max: 59 });
    const hh = chance.integer({ min: 1, max: 59 });

    expect(formatTime({ mm: mm + hh * 60 })).toEqual({
      hh,
      mm,
      ss: 0,
      ms: 0,
    });
  });
});
