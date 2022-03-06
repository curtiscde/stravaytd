import * as fs from 'fs';
import * as fsp from 'fs/promises';
import * as path from 'path';
import { generateNewYtd } from './generateNewYtd';
import { getYtdHistory } from './getYtdHistory';

const ytdFileLocation = '../app/data/ytdHistory.json';

const getAthletesCurrentYtd = () => {
  const currentYtdPath = '../data/current-ytd';
  const files = fs.readdirSync(path.join(currentYtdPath));
  const athletesYtd = [];
  files.forEach((file) => {
    const f = JSON.parse(fs.readFileSync(`${currentYtdPath}/${file}`, 'utf8'));
    athletesYtd.push(f);
  });
  return athletesYtd;
};

export const updateYtdHistory = async () => {
  const now = (new Date()).getTime();
  const ytd = getYtdHistory(ytdFileLocation);
  const athletesYtd = getAthletesCurrentYtd();
  const newYtd = generateNewYtd(ytd, athletesYtd, now);

  await fsp.writeFile(ytdFileLocation, JSON.stringify(newYtd));
};
