import * as fs from 'fs';
import * as fsp from 'fs/promises';
import * as core from '@actions/core';
import { spawn } from 'child_process';
import { IAthleteYtd } from '../types/IAthleteYtd';
import { getAthleteCurrentYtd } from './getAthleteCurrentYtd';

const ytdHasUpdates = (currentYtd: IAthleteYtd, newYtd: IAthleteYtd): boolean => {
  if (currentYtd.count !== newYtd.count) return true;
  if (currentYtd.distance !== newYtd.distance) return true;
  if (currentYtd.elevationGain !== newYtd.elevationGain) return true;
  if (currentYtd.movingTime !== newYtd.movingTime) return true;
  return false;
};

const gitCommit = (athleteYtd: IAthleteYtd) => {
  spawn('git', ['pull']);
  spawn('git', ['diff']);
  spawn('git', ['config', '--global', 'user.email', '"actions@users.noreply.github.com"']);
  spawn('git', ['config', '--global', 'user.name', '"gh action bot"']);
  spawn('git', ['add', '-A']);
  spawn('git', ['commit', '-m', `"🏃 Update athlete ytd ${athleteYtd.athleteId}"`]);
  spawn('git', ['push']);
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

  if (ytdHasUpdates(currentAthleteYtd, newYtd)) {
    if (!fs.existsSync(currentYtdPath)) fs.mkdirSync(currentYtdPath);
    await fsp.writeFile(`${currentYtdPath}/athlete${athleteId}.json`, JSON.stringify({
      athleteId, count, distance, movingTime, elevationGain,
    }));

    gitCommit(newYtd);
  } else {
    core.info('no ytd updates');
  }
};
