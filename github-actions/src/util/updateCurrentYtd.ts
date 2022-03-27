import * as fs from 'fs';
import * as fsp from 'fs/promises';
import * as core from '@actions/core';
import { IAthleteYtd } from '../types/IAthleteYtd';
import { commitAthleteYtd } from './commitAthleteYtd';
import { getAthleteCurrentYtd } from './getAthleteCurrentYtd';

const ytdHasUpdates = (currentYtd: IAthleteYtd, newYtd: IAthleteYtd): boolean => {
  if (currentYtd.count !== newYtd.count) return true;
  if (currentYtd.distance !== newYtd.distance) return true;
  if (currentYtd.elevationGain !== newYtd.elevationGain) return true;
  if (currentYtd.movingTime !== newYtd.movingTime) return true;
  return false;
};

export const updateCurrentYtd = async () => {
  const athleteId = Number(process.env.npm_config_athleteid);
  const count = Number(process.env.npm_config_count);
  const distance = Number(process.env.npm_config_distance);
  const movingTime = Number(process.env.npm_config_movingtime);
  const elevationGain = Number(process.env.npm_config_elevationgain);

  const newYtd: IAthleteYtd = {
    athleteId, count, distance, movingTime, elevationGain,
  };

  const currentYtdPath = '../data/current-ytd';
  const currentAthleteYtd = getAthleteCurrentYtd(currentYtdPath, athleteId);

  if (!currentAthleteYtd || ytdHasUpdates(currentAthleteYtd, newYtd)) {
    if (!fs.existsSync(currentYtdPath)) fs.mkdirSync(currentYtdPath);
    await fsp.writeFile(`${currentYtdPath}/athlete${athleteId}.json`, JSON.stringify({
      athleteId, count, distance, movingTime, elevationGain,
    }));

    await commitAthleteYtd(newYtd);
  } else {
    core.info(`no ytd updates for athlete ${newYtd.athleteId}`);
  }
};
