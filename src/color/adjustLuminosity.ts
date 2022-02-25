import clamp from "../clamp";

/**
 * increases luminosity only, works with other `adjust` functions
 * @param hsl array of hue, saturation and luminosity
 * @param percent the percentage increase or decrease
 * @param increase indicates increase (true) or decrease (false)
 * @returns hsl with modified luminosity
 */
export default function adjustLuminosity(
  hsl: [number, number, number],
  percent: number,
  increase = true
): [number, number, number] {
  const [hue, sat, lum] = hsl;
  const direction = increase ? 1 : -1;
  const updatedLum = clamp(lum + ((lum * percent) / 100) * direction);
  return [hue, sat, updatedLum];
}
