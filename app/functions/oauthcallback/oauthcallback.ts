import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import { db } from '../../firebase/admin';
import { encrypt } from './encrypt';

require('dotenv').config();

interface IOAuthTokenResponse {
  refresh_token: string;
  athlete: {
    id: number;
  }
}

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



export const handler: Handler = async (event: any) => {
  const code = event.queryStringParameters['code'];
  const authData = await getAuthData(code);

  try {
    await db
      .collection('users')
      .add({ id: authData.athlete.id, token: encrypt(authData.refresh_token) })
      .then(() => console.log('user added'))
      .catch((e) => { throw new Error(e) });
  } catch (e) {
    return { statusCode: 500 }
  }

  return { statusCode: 200 }
}