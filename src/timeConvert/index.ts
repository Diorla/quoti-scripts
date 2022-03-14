import TimeProps from "../interfaces/TimeProps";
import TimeType from "../interfaces/TimeType";

export default function timeConvert(time: TimeProps, to?: TimeType) {
  let { hh = 0, mm = 0, ss = 0, ms = 0 } = time;
  if (to === "hh") {
    hh += mm / 60;
    hh += ss / 3600;
    hh += ms / 3600000;
    return {
      hh,
      mm: 0,
      ss: 0,
      ms: 0,
    };
  }
  if (to === "mm") {
    mm += hh * 60;
    mm += ss / 60;
    mm += ms / 60000;
    return {
      hh: 0,
      mm,
      ss: 0,
      ms: 0,
    };
  }
  if (to === "ss") {
    ss += hh * 3600;
    ss += mm * 60;
    ss += ms / 1000;
    return {
      hh: 0,
      mm: 0,
      ss,
      ms: 0,
    };
  }
  ms += hh * 3600000;
  ms += mm * 60000;
  ms += ss * 1000;
  return {
    hh: 0,
    mm: 0,
    ss: 0,
    ms,
  };
}
