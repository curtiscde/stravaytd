import * as fs from 'fs';
import * as path from 'path';
import { AthleteYtd } from '../types/AthleteYtd';

export const getAthletesCurrentYtd = (currentYtdPath: string): AthleteYtd[] => {
  const files = fs.readdirSync(path.join(currentYtdPath));
  const athletesYtd = [];
  files.forEach((file) => {
    const f = JSON.parse(fs.readFileSync(`${currentYtdPath}/${file}`, 'utf8'));
    athletesYtd.push(f);
  });
  return athletesYtd;
};
