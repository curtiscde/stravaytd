import fetch from 'node-fetch';
import { IOAuthTokenResponse } from './IOAuthTokenResponse';

require('dotenv').config();

export async function getAuthData(code: string): Promise<IOAuthTokenResponse> {
  return fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENTID,
      client_secret: process.env.STRAVA_CLIENTSECRET,
      code,
    }),
  })
    .then((res: any) => res.json());
}
