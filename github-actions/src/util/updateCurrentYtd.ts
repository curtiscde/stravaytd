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

type WriteCurrentYtdFile = (props: {
  path: string;
  data: IAthleteYtd;
}) => void;

const writeCurrentYtdFile: WriteCurrentYtdFile = async ({ path, data }) => {
  if (!fs.existsSync(path)) fs.mkdirSync(path);
  await fsp.writeFile(`${path}/athlete${data.athleteId}.json`, JSON.stringify(data));
};

export const updateCurrentYtd = async () => {
  const athleteId = Number(process.env.npm_config_athleteid);
  const count = Number(process.env.npm_config_count);
  const distance = Number(process.env.npm_config_distance);
  const movingTime = Number(process.env.npm_config_movingtime);
  const elevationGain = Number(process.env.npm_config_elevationgain);
  const noCommit = Number(process.env.npm_config_nocommit) === 1;

  const now = new Date().getTime();

  const newYtd: IAthleteYtd = {
    athleteId, count, distance, movingTime, elevationGain, lastUpdated: now,
  };

  const currentYtdPath = '../data/current-ytd';
  const currentAthleteYtd = getAthleteCurrentYtd(currentYtdPath, athleteId);

  if (!currentAthleteYtd || ytdHasUpdates(currentAthleteYtd, newYtd)) {
    await writeCurrentYtdFile({ path: currentYtdPath, data: newYtd });
    await writeCurrentYtdFile({ path: '../app/data/current-ytd', data: newYtd });

    if (!noCommit) {
      await commitAthleteYtd(newYtd);
    }
  } else {
    core.info(`no ytd updates for athlete ${newYtd.athleteId}`);
  }
};
