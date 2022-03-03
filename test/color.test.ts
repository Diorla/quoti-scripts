import Chance from "chance";
import contrastColor from "../src/color/contrastColor";
import adjustLuminosity from "../src/color/adjustLuminosity";
import "jest-extended";
import darkenColor from "../src/color/darkenColor";
import lightenColor from "../src/color/lightenColor";

describe("should test color functions", () => {
  const chance = new Chance();
  it("should test for contrastColor", () => {
    const black = contrastColor("black", "keyword");
    const white = contrastColor("white", "keyword");
    expect(black).toBe("white");
    expect(white).toBe("black");

    expect(contrastColor("333333")).toBe("white");
    expect(contrastColor("#ddd")).toBe("black");

    // Closer to black
    const lowRed = chance.integer({ min: 0, max: 120 });
    const lowGreen = chance.integer({ min: 0, max: 120 });
    const lowBlue = chance.integer({ min: 0, max: 120 });

    // Closer to white
    const highRed = chance.integer({ max: 255, min: 130 });
    const highGreen = chance.integer({ max: 255, min: 130 });
    const highBlue = chance.integer({ max: 255, min: 130 });

    expect(
      contrastColor(`rgb(${lowRed}, ${lowGreen}, ${lowBlue})`, "rgb")
    ).toBe("white");
    expect(
      contrastColor(`rgb(${highRed}, ${highGreen}, ${highBlue})`, "rgb")
    ).toBe("black");
  });
  it("should test for adjustLuminosity", () => {
    const hue = chance.integer({ min: 0, max: 360 });
    const sat = chance.integer({ min: 0, max: 100 });
    const lum = chance.integer({ min: 0, max: 100 });
    const percentage = chance.integer({ min: 1, max: 100 });

    const default_hsl = adjustLuminosity([hue, sat, lum], percentage);
    const increased_hsl = adjustLuminosity([hue, sat, lum], percentage, true);
    const decreased_hsl = adjustLuminosity([hue, sat, lum], percentage, false);

    const [, , default_lum] = default_hsl;
    const [, , increased_lum] = increased_hsl;
    const [, , decreased_lum] = decreased_hsl;

    expect(default_lum).toBeGreaterThanOrEqual(lum);
    expect(increased_lum).toBeGreaterThanOrEqual(lum);
    expect(decreased_lum).toBeLessThanOrEqual(lum);
  });

  it("should test return the same colour type", () => {
    const percentage = chance.integer({ min: 0, max: 100 });

    // RGB
    const darkRGB = darkenColor("rgb(50, 150, 200)", percentage, "rgb");
    const lightRGB = lightenColor("rgb(50, 150, 200)", percentage, "rgb");
    const includesRGB = darkRGB.includes("rgb") && lightRGB.includes("rgb");
    expect(includesRGB).toBe(true);

    // Hex
    const darkHex = darkenColor("#ade01a", percentage);
    const lightHex = lightenColor("#ade01a", percentage);
    const includesHex = darkHex.includes("#") && lightHex.includes("#");
    expect(includesHex).toBe(true);

    // HSL
    const darkHSL = darkenColor("hsl(270deg 50% 40%)", percentage, "hsl");
    const lightHSL = lightenColor("hsl(270deg 50% 40%)", percentage, "hsl");
    const includesHSL = darkHSL.includes("hsl") && lightHSL.includes("hsl");
    expect(includesHSL).toBe(true);
  });
});
