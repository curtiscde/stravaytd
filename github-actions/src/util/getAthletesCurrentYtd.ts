import * as fs from 'fs';
import * as path from 'path';

export const getAthletesCurrentYtd = (currentYtdPath: string) => {
  const files = fs.readdirSync(path.join(currentYtdPath));
  const athletesYtd = [];
  files.forEach((file) => {
    const f = JSON.parse(fs.readFileSync(`${currentYtdPath}/${file}`, 'utf8'));
    athletesYtd.push(f);
  });
  return athletesYtd;
};
