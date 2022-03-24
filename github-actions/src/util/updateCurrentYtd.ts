import * as fs from 'fs';
import * as fsp from 'fs/promises';

export const updateCurrentYtd = async () => {
  const athleteId = Number(process.env.npm_config_athleteid);
  const count = Number(process.env.npm_config_count);
  const distance = Number(process.env.npm_config_distance);
  const movingTime = Number(process.env.npm_config_movingtime);
  const elevationGain = Number(process.env.npm_config_elevationgain);

  const dir = '../data/current-ytd';

  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  if (ytdHasUpdates(currentAthleteYtd, newYtd)) {
    if (!fs.existsSync(currentYtdPath)) fs.mkdirSync(currentYtdPath);
    await fsp.writeFile(`${currentYtdPath}/athlete${athleteId}.json`, JSON.stringify(newYtd));

    gitCommit(newYtd);
  } else {
    core.info('no ytd updates');
  }
};
