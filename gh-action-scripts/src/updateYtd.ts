import * as fs from 'fs';
import * as path from 'path';
import { generateNewYtd } from './util/generateNewYtd';

const ytdFileLocation = '../app/data/ytd.json';

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
  const files = fs.readdirSync(path.join('../current-ytd'));
  const athletesYtd = [];
  files.forEach(file => {
    const f = JSON.parse(fs.readFileSync(`../current-ytd/${file}`, 'utf8'))
    athletesYtd.push(f);
  })
  return athletesYtd;
}

const updateYtd = async () => {
  const now = (new Date()).getTime();
  const ytd = getYtd();
  const athletesYtd = getAthletesCurrentYtd();

  console.log('new athletesYtd', athletesYtd)

  const newYtd = generateNewYtd(ytd, athletesYtd, now)
}

updateYtd();