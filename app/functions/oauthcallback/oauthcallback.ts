/* eslint-disable no-console */
import { Handler } from '@netlify/functions';
import fetch from 'node-fetch';
import { isAthleteAllowed } from '../../util/isAthleteAllowed';
import { IAthleteYtd } from '../types/IAthleteYtd';
import { dispatchAction } from '../util/dispatchAction';
import { getAthleteYtd } from '../util/getAthleteYtd';
import { IOAuthTokenResponse } from './IOAuthTokenResponse';
import { upsertUser } from './upsertUser';

require('dotenv').config();

async function getAuthData(code: string): Promise<IOAuthTokenResponse> {
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

export const handler: Handler = async (event: any) => {
  const { code } = event.queryStringParameters;

  try {
    const authData = await getAuthData(code);
    if (!isAthleteAllowed(process.env.ALLOWED_ATHLETES!, authData.athlete.id)) {
      return { statusCode: 401 };
    }
    await upsertUser(authData);
    console.log('user added');
    const athleteYtd: IAthleteYtd = await getAthleteYtd({
      accessToken: authData.access_token,
      athleteId: authData.athlete.id,
    });
    await dispatchAction(athleteYtd);
    console.log('latest ytd dispatched');
  } catch (e) {
    return { statusCode: 500 };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      verified: true,
      ytdSet: true,
    }),
  };
};
