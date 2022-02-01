import { Handler } from '@netlify/functions';
import { db } from '../../firebase/admin';
import { decrypt } from './decrypt';
import { dispatchAction } from './dispatchAction';
import { getAccessToken } from './getAccessToken';
import { getAthleteYtd } from './getAthleteYtd';
import { IAthleteYtd } from './IAthleteYtd';

require('dotenv').config();

const getWebhook = (event: any) => {
  // Parses the query params
  const mode = event.queryStringParameters['hub.mode'];
  const token = event.queryStringParameters['hub.verify_token'];
  const challenge = event.queryStringParameters['hub.challenge'];
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Verifies that the mode and token sent are valid
    if (mode === 'subscribe' && token === process.env.STRAVA_VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      return { statusCode: 200, body: JSON.stringify({ "hub.challenge": challenge }) }
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      return { statusCode: 403 }
    }
  }

  return {
    statusCode: 500
  }
}

async function getToken(id: number) {
  return await db
    .collection('users')
    .where('id', '==', id)
    .limit(1)
    .get()
    .then(data => {
      return data.docs[0].get('token')
    })
}

const postWebHook = async (event: any) => {
  const {
    aspect_type: aspectType,
    object_type: objectType,
    owner_id: ownerId,
  } = JSON.parse(event.body);

  console.log('aspectType', aspectType)
  console.log('objectType', objectType)
  console.log('ownerId', ownerId)

  try {
    const token = await getToken(ownerId);
    const refreshToken = decrypt(token);
    const accessToken = await getAccessToken(refreshToken);
    const athleteYtd = await getAthleteYtd({ accessToken, athleteId: ownerId });
    await dispatchAction(athleteYtd);
  } catch (e) { }
}

export const handler: Handler = async (event) => {
  console.log('webhook')
  if (event.httpMethod === 'GET') {
    return getWebhook(event);
  }

  if (event.httpMethod === 'POST') {
    postWebHook(event);
    return { statusCode: 200 }
  }

  return { statusCode: 404 }
};
