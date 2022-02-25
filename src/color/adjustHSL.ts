import adjustLuminosity from "./adjustLuminosity";

/**
 * Handles hsl colours
 * @param color hsl colour e.g. hsl(234deg 55% 80%)
 * @param percent rate of increase or decrease in luminosity
 * @param increase whether to increase or decrease it
 * @returns hsl colour
 */
export default function adjustHSL(
  color: string,
  percent: number,
  increase = true
) {
  const clr = color
    .replace("hsl", "")
    .replace("(", "")
    .replace(")", "")
    .split(" ");

  const [h, s, l] = clr;

  const [hue, sat, lum] = adjustLuminosity(
    [
      Number(h.replace("deg", "")),
      Number(s.replace("%", "")),
      Number(l.replace("%", "")),
    ],
    percent,
    increase
  );

  return `hsl(${hue}deg ${sat}% ${lum}%)`;
}
