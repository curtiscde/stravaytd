import { dispatchAction } from '../util/dispatchAction';
import { getAthleteYtd } from '../util/getAthleteYtd';
import { decrypt } from './decrypt';
import { getAccessToken } from './getAccessToken';
import { getToken } from './getToken';

require('dotenv').config();

export const postWebhook = async (event: any) => {
  console.log('postWebhook call');
  const { owner_id: ownerId } = JSON.parse(event.body);

  try {
    const token = await getToken(ownerId);
    const refreshToken = decrypt(token);
    const accessToken = await getAccessToken(refreshToken);
    const athleteYtd = await getAthleteYtd({ accessToken, athleteId: ownerId });
    await dispatchAction(athleteYtd);
  } catch (e) {
    console.log('error dispatching action');
  }
};
