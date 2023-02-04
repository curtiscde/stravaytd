import * as fsp from 'fs/promises';
import * as core from '@actions/core';
import { generateNewYtd } from './generateNewYtd';
import { getAthletesCurrentYtd } from './getAthletesCurrentYtd';
import { getYtdHistory } from './getYtdHistory';

const ytdFileLocationApp = '../app/data/ytdHistory.json';
const ytdFileLocation = '../data/ytdHistory.json';
const currentYtdPath = '../data/current-ytd';

export const updateYtdHistory = async () => {
  const now = (new Date()).getTime();
  const ytd = getYtdHistory(ytdFileLocation);
  const athletesYtd = getAthletesCurrentYtd(currentYtdPath);
  const newYtd = generateNewYtd(ytd, athletesYtd, now);

  await fsp.writeFile(ytdFileLocation, JSON.stringify(newYtd));
  await fsp.writeFile(ytdFileLocationApp, JSON.stringify(newYtd));

  core.setOutput('ytdVersion', newYtd.meta.version);
};
