import fetch from 'node-fetch';

require('dotenv').config();

export async function getAccessToken(refreshToken: string) {
  return fetch('https://www.strava.com/oauth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.STRAVA_CLIENTID,
      client_secret: process.env.STRAVA_CLIENTSECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  })
    .then((res) => res.json())
    .then((res: any) => res.access_token);
}
