import * as fsp from 'fs/promises';
import { addFinalDateToYtdHistory } from './addFinalDateToYtdHistory';
import { generateRealTimeYtd } from './generateRealTimeYtd';
import { getAthletesCurrentYtd } from './getAthletesCurrentYtd';
import { getYtdHistory } from './getYtdHistory';

const ytdFileLocationApp = '../app/data/ytdHistory.json';
const currentYtdPath = '../data/current-ytd';

export const updateYtdRealTime = async ({ now }: { now:number }) => {
  const ytd = getYtdHistory(ytdFileLocationApp);
  const currentYtds = getAthletesCurrentYtd(currentYtdPath);

  let realTimeYtd = generateRealTimeYtd({ ytd, currentYtds, now });
  realTimeYtd = addFinalDateToYtdHistory({ ytdHistory: realTimeYtd });

  await fsp.writeFile(ytdFileLocationApp, JSON.stringify(realTimeYtd));
};
