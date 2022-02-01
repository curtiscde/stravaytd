import fs from 'fs';
import fsp from 'fs/promises';

const updateCurrentYtd = async () => {
  const athleteId = Number(process.env.npm_config_athleteid);
  const count = Number(process.env.npm_config_count);
  const distance = Number(process.env.npm_config_distance);
  const movingTime = Number(process.env.npm_config_movingtime);
  const elevationGain = Number(process.env.npm_config_elevationgain)

  const dir = '../current-ytd';

  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  await fsp.writeFile(`${dir}/athlete${athleteId}.json`, JSON.stringify({
    athleteId, count, distance, movingTime, elevationGain
  }));
}

await updateCurrentYtd();