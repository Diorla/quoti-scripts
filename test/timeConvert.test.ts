import Chance from "chance";
import timeConvert from "../src/timeConvert";

describe("testing time convert", () => {
  const chance = new Chance();
  it("should convert with default value", () => {
    const { hh, mm, ss, ms } = timeConvert({});
    expect(hh).toBe(0);
    expect(mm).toBe(0);
    expect(ss).toBe(0);
    expect(ms).toBe(0);
  });
  it("should not change", () => {
    const value = Math.abs(chance.integer());
    const initialValue = {
      hh: 0,
      mm: 0,
      ss: 0,
      ms: 0,
    };
    expect(timeConvert({ ms: value })).toEqual({ ...initialValue, ms: value });
    expect(timeConvert({ ss: value }, "ss")).toEqual({
      ...initialValue,
      ss: value,
    });
    expect(timeConvert({ mm: value }, "mm")).toEqual({
      ...initialValue,
      mm: value,
    });
    expect(timeConvert({ hh: value }, "hh")).toEqual({
      ...initialValue,
      hh: value,
    });
  });
  it("should convert downward", () => {
    const value = Math.abs(chance.integer());
    const initialValue = {
      hh: 0,
      mm: 0,
      ss: 0,
      ms: 0,
    };
    expect(timeConvert({ hh: value }, "mm")).toEqual({
      ...initialValue,
      mm: value * 60,
    });
    expect(timeConvert({ mm: value }, "ss")).toEqual({
      ...initialValue,
      ss: value * 60,
    });
    expect(timeConvert({ ss: value })).toEqual({
      ...initialValue,
      ms: value * 1000,
    });
  });
  it("should convert upwards", () => {
    const value = Math.abs(chance.integer());
    const initialValue = {
      hh: 0,
      mm: 0,
      ss: 0,
      ms: 0,
    };
    expect(timeConvert({ ms: value }, "ss")).toEqual({
      ...initialValue,
      ss: value / 1000,
    });
    expect(timeConvert({ ss: value }, "mm")).toEqual({
      ...initialValue,
      mm: value / 60,
    });
    expect(timeConvert({ mm: value }, "hh")).toEqual({
      ...initialValue,
      hh: value / 60,
    });
  });
});
