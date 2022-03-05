/* eslint-disable no-console */
import { isAthleteAllowed } from '../../util/isAthleteAllowed';
import { getAuthData } from './getAuthData';
import { upsertUser } from './upsertUser';

require('dotenv').config();

interface IAuthoriseUser {
  authorised: boolean;
  authData?: {
    accessToken: string;
    athleteId: number;
  }
}

export const authoriseUser = async (code: string): Promise<IAuthoriseUser> => {
  const authData = await getAuthData(code);
  if (!isAthleteAllowed(process.env.ALLOWED_ATHLETES!, authData.athlete.id)) {
    return { authorised: false };
  }
  await upsertUser(authData);
  console.log('user added');
  return {
    authorised: true,
    authData: {
      accessToken: authData.access_token,
      athleteId: authData.athlete.id,
    },
  };
};
