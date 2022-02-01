import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import { IOAuthTokenResponse } from './IOAuthTokenResponse';
import { upsertUser } from './upsertUser';

require('dotenv').config();

async function getAuthData(code: string): Promise<IOAuthTokenResponse> {
  return await fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENTID,
      client_secret: process.env.STRAVA_CLIENTSECRET,
      code,
    })
  })
    .then((res: any) => res.json())
}

function isAthleteAllowed(athleteId: number): boolean {
  return process.env.ALLOWED_ATHLETES!
    .split(',')
    .map(id => Number(id))
    .includes(athleteId)
}

export const handler: Handler = async (event: any) => {
  const code = event.queryStringParameters['code'];

  try {
    const authData = await getAuthData(code);
    if (!isAthleteAllowed) return { statusCode: 401 }
    await upsertUser(authData)
  } catch (e) {
    return { statusCode: 500 }
  }

  return { statusCode: 200 }
}