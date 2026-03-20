import fetch from 'node-fetch';
import { OAuthTokenResponse } from './OAuthTokenResponse';

require('dotenv').config();

export async function getAuthData(code: string): Promise<OAuthTokenResponse> {
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
