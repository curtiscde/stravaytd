/* eslint-disable no-console */
import { Handler } from '@netlify/functions';
import { decrypt } from './decrypt';
import { dispatchAction } from '../util/dispatchAction';
import { getAccessToken } from './getAccessToken';
import { getAthleteYtd } from '../util/getAthleteYtd';
import { getToken } from './getToken';
import { getWebhook } from './getWebhook';

require('dotenv').config();

const postWebhook = async (event: any) => {
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

export const handler: Handler = async (event) => {
  console.log('webhook call');
  if (event.httpMethod === 'GET') {
    return getWebhook(event);
  }

  if (event.httpMethod === 'POST') {
    await postWebhook(event);
    return { statusCode: 200 };
  }

  return { statusCode: 404 };
};
