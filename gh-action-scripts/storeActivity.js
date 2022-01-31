import fs from 'fs';
import fsp from 'fs/promises';

const storeActivity = async () => {
  const activityId = Number(process.env.npm_config_activityid);
  const distance = Number(process.env.npm_config_distance);
  const movingTime = Number(process.env.npm_config_movingtime);

  console.log('activityId', activityId)
  console.log('distance', distance)
  console.log('movingTime', movingTime)

  const dir = '../pending-activities';

  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  await fsp.writeFile(`${dir}/activity${activityId}.json`, JSON.stringify({
    activityId, distance, movingTime
  }));
}

await storeActivity();