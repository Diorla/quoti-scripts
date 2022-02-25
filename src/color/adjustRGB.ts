import { rgb, hsl } from "color-convert";
import adjustLuminosity from "./adjustLuminosity";

/**
 * Handles rgb colours
 * @param color rgb colour e.g. rgb(50, 100, 150)
 * @param percent rate of increase or decrease in luminosity
 * @param increase whether to increase or decrease it
 * @returns rgb colour
 */
export default function adjustRGB(
  color: string,
  percent: number,
  increase = true
) {
  const clr = color
    .replace("rgb", "")
    .replace("(", "")
    .replace(")", "")
    .split(",")
    .map(item => Number(item));

  const [hue, sat, lum] = adjustLuminosity(
    rgb.hsl(clr[0], clr[1], clr[2]),
    percent,
    increase
  );
  const rgbColor = hsl.rgb([hue, sat, lum]).join(", ");
  return `rgb(${rgbColor})`;
}
