import { hsl, keyword } from "color-convert";
import adjustLuminosity from "./adjustLuminosity";

/**
 * Handles css colours
 * @param color one of the basic css colours, like blue or red
 * @param percent rate of increase or decrease in luminosity
 * @param increase whether to increase or decrease it
 * @returns hex colour
 */
export default function adjustColorKeyword(
  color: string,
  percent: number,
  increase = true
) {
  const [hue, sat, lum] = keyword.hsl(color as any);
  return "#" + hsl.hex(adjustLuminosity([hue, sat, lum], percent, increase));
}
