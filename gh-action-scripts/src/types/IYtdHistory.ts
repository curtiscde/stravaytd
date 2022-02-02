interface IYtd {
  date: number;
  count: number;
  distance: number;
  elevationGain: number;
  movingTime: number;
}

interface IAthlete {
  athleteId: number,
  ytd: Array<IYtd>;
}

export interface IYtdHistory {
  meta: {
    version: number;
    lastUpdated: number;
  },
  athletes: Array<IAthlete>;
}