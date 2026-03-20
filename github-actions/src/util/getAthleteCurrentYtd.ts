import * as fs from 'fs';
import { AthleteYtd } from '../types/AthleteYtd';

// eslint-disable-next-line max-len
export const getAthleteCurrentYtd = (currentYtdPath: string, athleteId: number): AthleteYtd => {
  try {
    return JSON.parse(fs.readFileSync(`${currentYtdPath}/athlete${athleteId}.json`, 'utf8'));
  } catch {
    return null;
  }
};
