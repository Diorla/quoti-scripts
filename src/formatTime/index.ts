import TimeProps from "../interfaces/TimeProps";

export default function formatTime(time: TimeProps) {
  let { hh = 0, mm = 0, ss = 0, ms = 0 } = time;
  if (ms > 1000) {
    const rem = Math.floor(ms / 1000);
    ms = ms % 1000;
    ss += rem;
  }
  if (ss > 60) {
    const rem = Math.floor(ss / 60);
    ss = ss % 60;
    mm += rem;
  }
  if (mm > 60) {
    const rem = Math.floor(mm / 60);
    mm = mm % 60;
    hh += rem;
  }
  return {
    hh,
    mm,
    ss,
    ms,
  };
}
