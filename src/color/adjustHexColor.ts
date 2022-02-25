import { hsl, hex } from "color-convert";
import adjustLuminosity from "./adjustLuminosity";

/**
 * Handles hex colours
 * @param color hex colour e.g. #ab1o2a
 * @param percent rate of increase or decrease in luminosity
 * @param increase whether to increase or decrease it
 * @returns hex colour
 */
export default function adjustHexColor(
  color: string,
  percent: number,
  increase = true
) {
  const [hue, sat, lum] = hex.hsl(color);
  return "#" + hsl.hex(adjustLuminosity([hue, sat, lum], percent, increase));
}
