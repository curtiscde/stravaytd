import { Ytd } from './Ytd';

interface Athlete {
  athleteId: number,
  ytd: Array<Ytd>;
}

export interface YtdHistory {
  meta: {
    version: number;
    minorVersion?: number;
    lastUpdated: number;
  },
  athletes: Array<Athlete>;
}
