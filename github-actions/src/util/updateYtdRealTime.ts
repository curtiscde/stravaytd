import * as fsp from 'fs/promises';
import { generateRealTimeYtd } from './generateRealTimeYtd';
import { getAthletesCurrentYtd } from './getAthletesCurrentYtd';
import { getYtdHistory } from './getYtdHistory';

const ytdFileLocationApp = '../app/data/ytdHistory.json';
const currentYtdPath = '../data/current-ytd';

export const updateYtdRealTime = async () => {
  const ytd = getYtdHistory(ytdFileLocationApp);
  const athletesYtd = getAthletesCurrentYtd(currentYtdPath);

  const realTimeYtd = generateRealTimeYtd(ytd, athletesYtd);

  await fsp.writeFile(ytdFileLocationApp, JSON.stringify(realTimeYtd));
};
