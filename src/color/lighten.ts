import ColorType from "../interfaces/ColorType";
import adjustColorKeyword from "./adjustColorKeyword";
import adjustHexColor from "./adjustHexColor";
import adjustHSL from "./adjustHSL";
import adjustRGB from "./adjustRGB";

/**
 * It will lighten the colour
 * @param color the string, based on one of the color types e.g. #ade or rgb(1, 2, 3)
 * @param percent from 0 to 100
 * @param type one of the color types to match `color`, e.g. rgb, hsl, hex, keyword, default is hex
 * @returns string that is modified based on degree
 */
export default function lighten(
  color: string,
  percent: number,
  type?: ColorType
) {
  if (type === "rgb") {
    return adjustRGB(color, percent);
  }

  if (type === "keyword") {
    return adjustColorKeyword(color, percent);
  }

  if (type === "hsl") {
    return adjustHSL(color, percent);
  }

  return adjustHexColor(color, percent);
}
