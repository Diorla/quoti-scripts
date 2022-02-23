import Chance from "chance";
import clamp from "../src/clamp";

describe("testing for clamp function", () => {
  const chance = new Chance();
  it("should test for default parameters", () => {
    const within = chance.integer({ min: 0, max: 100 });
    const above = chance.integer({ min: 120 });
    const below = chance.integer({ max: 0 });

    expect(clamp(within)).toBe(within);
    expect(clamp(above)).toBe(100);
    expect(clamp(below)).toBe(0);
  });

  it("should test for minimum parameters", () => {
    const minParam = chance.integer({ max: 50 });
    const belowMinParam = chance.integer({ max: minParam });
    const inBetweenParam = chance.integer({ min: minParam, max: 100 });
    const aboveMaxParam = chance.integer({ min: 100 });

    expect(clamp(belowMinParam, minParam)).toBe(minParam);
    expect(clamp(inBetweenParam, minParam)).toBe(inBetweenParam);
    expect(clamp(aboveMaxParam, minParam)).toBe(100);
  });

  it("should test for maximum parameters", () => {
    const maxParam = Math.abs(chance.integer());
    const minParam = chance.integer({ max: Math.floor(maxParam / 2) });
    const belowMinParam = chance.integer({ max: minParam });
    const inBetweenParam = chance.integer({ min: minParam, max: maxParam });
    const aboveMaxParam = chance.integer({ min: maxParam });

    expect(clamp(belowMinParam, minParam, maxParam)).toBe(minParam);
    expect(clamp(inBetweenParam, minParam, maxParam)).toBe(inBetweenParam);
    expect(clamp(aboveMaxParam, minParam, maxParam)).toBe(maxParam);
  });
});
