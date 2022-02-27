import { rgb, hex, keyword } from "color-convert";
import ColorType from "../interfaces/ColorType";

/**
 * It will darken the colour
 * @param color the string, based on one of the color types e.g. #ade or rgb(1, 2, 3)
 * @param type one of the color types to match `color`, e.g. rgb, hsl, hex, keyword, default is hex
 * @returns string that is modified based on degree
 */
export function isDark(color: string, type?: ColorType) {
  if (type === "rgb") {
    const clr = color
      .replace("rgb", "")
      .replace("(", "")
      .replace(")", "")
      .split(",")
      .map(item => Number(item));

    const [, , lum] = rgb.hsl(clr[0], clr[1], clr[2]);

    return lum <= 50;
  }

  if (type === "keyword") {
    const [, , lum] = keyword.hsl(color as any);
    return lum <= 50;
  }

  if (type === "hsl") {
    const clr = color
      .replace("hsl", "")
      .replace("(", "")
      .replace(")", "")
      .split(" ");

    const [, , lum] = clr;
    return Number(lum) <= 50;
  }
  const [, , lum] = hex.hsl(color);
  return lum <= 50;
}

export default function contrastColor(color: string, type?: ColorType) {
  return isDark(color, type) ? "white" : "black";
}
