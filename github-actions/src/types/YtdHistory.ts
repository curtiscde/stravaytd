import { IYtd } from './IYtd';

interface IAthlete {
  athleteId: number,
  ytd: Array<IYtd>;
}

export interface IYtdHistory {
  meta: {
    version: number;
    minorVersion?: number;
    lastUpdated: number;
  },
  athletes: Array<IAthlete>;
}
