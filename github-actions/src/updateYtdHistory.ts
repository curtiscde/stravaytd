import * as fs from 'fs';
import * as fsp from 'fs/promises';
import * as path from 'path';
import { generateNewYtd } from './util/generateNewYtd';

const ytdFileLocation = '../data/ytdHistory.json';

const getYtd = () => {
  const file = fs.readFileSync(ytdFileLocation, 'utf8')
  try {
    const ytd = JSON.parse(file)
    if (!ytd.athletes) return { athletes: [] }
    return ytd
  } catch {
    return { athletes: [] }
  }
};

const getAthletesCurrentYtd = () => {
  const currentYtdPath = '../data/current-ytd';
  const files = fs.readdirSync(path.join(currentYtdPath));
  const athletesYtd = [];
  files.forEach(file => {
    const f = JSON.parse(fs.readFileSync(`${currentYtdPath}/${file}`, 'utf8'))
    athletesYtd.push(f);
  })
  return athletesYtd;
}

const updateYtd = async () => {
  const now = (new Date()).getTime();
  const ytd = getYtd();
  const athletesYtd = getAthletesCurrentYtd();
  const newYtd = generateNewYtd(ytd, athletesYtd, now)

  await fsp.writeFile(ytdFileLocation, JSON.stringify(newYtd));
}

updateYtd();