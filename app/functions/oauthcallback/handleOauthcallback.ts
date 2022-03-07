import { IAthleteYtd } from '../types/IAthleteYtd';
import { dispatchAction } from '../util/dispatchAction';
import { getAthleteYtd } from '../util/getAthleteYtd';
import { authoriseUser } from './authoriseUser';

require('dotenv').config();

export const handleOauthcallback = async (event: any) => {
  const { code } = event.queryStringParameters;

  try {
    const { authorised, authData } = await authoriseUser(code);
    if (!authorised) return { statusCode: 401 };
    const { accessToken, athleteId } = authData!;
    const athleteYtd: IAthleteYtd = await getAthleteYtd({ accessToken, athleteId });
    await dispatchAction(athleteYtd);
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
