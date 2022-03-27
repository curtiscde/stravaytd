import * as fs from 'fs';
import { IAthleteYtd } from '../types/IAthleteYtd';

// eslint-disable-next-line max-len
export const getAthleteCurrentYtd = (currentYtdPath: string, athleteId: number): IAthleteYtd => {
  try {
    return JSON.parse(fs.readFileSync(`${currentYtdPath}/athlete${athleteId}.json`, 'utf8'));
  } catch {
    return null;
  }
};
