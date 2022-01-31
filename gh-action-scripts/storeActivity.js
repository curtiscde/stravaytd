import fs from 'fs/promises';

const storeActivity = async () => {
  const activityId = Number(process.env.npm_config_activityid);
  const distance = Number(process.env.npm_config_distance);
  const movingTime = Number(process.env.npm_config_movingtime);

  await fs.writeFile(`../pending-activities/activity${activityId}.json`, JSON.stringify({
    activityId, distance, movingTime
  }));
}

await storeActivity();