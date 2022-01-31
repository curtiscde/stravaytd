import fs from 'fs/promises';

const storeActivity = async () => {
  const activityId = Number(process.env.npm_config_activityid);
  const distance = Number(process.env.npm_config_distance);
  const movingTime = Number(process.env.npm_config_movingtime);

  console.log('process.env.npm_config_activityid', process.env.npm_config_activityid)
  console.log('process.env.npm_config_distance', process.env.npm_config_distance)
  console.log('process.env.npm_config_movingtime', process.env.npm_config_movingtime)

  console.log('activityId', activityId)
  console.log('distance', distance)
  console.log('movingTime', movingTime)

  await fs.writeFile(`../pending-activities/activity${activityId}.json`, JSON.stringify({
    activityId, distance, movingTime
  }));
}

await storeActivity();