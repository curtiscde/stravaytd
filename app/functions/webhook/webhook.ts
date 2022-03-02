/* eslint-disable no-console */
import { Handler } from '@netlify/functions';
import { decrypt } from './decrypt';
import { dispatchAction } from '../util/dispatchAction';
import { getAccessToken } from './getAccessToken';
import { getAthleteYtd } from '../util/getAthleteYtd';
import { getToken } from './getToken';

require('dotenv').config();

const getWebhook = (event: any) => {
  const mode = event.queryStringParameters['hub.mode'];
  const token = event.queryStringParameters['hub.verify_token'];
  const challenge = event.queryStringParameters['hub.challenge'];
  if (mode && token) {
    if (mode === 'subscribe' && token === process.env.STRAVA_VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      return { statusCode: 200, body: JSON.stringify({ 'hub.challenge': challenge }) };
    }
    return { statusCode: 403 };
  }

  return {
    statusCode: 500,
  };
};

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
