import fetch from 'node-fetch';
import { IAthleteYtd } from '../types/IAthleteYtd';

interface IGetAthleteYtdProps {
  accessToken: string;
  athleteId: number;
}

export async function getAthleteYtd(
  { accessToken, athleteId }: IGetAthleteYtdProps,
): Promise<IAthleteYtd> {
  return fetch(`https://www.strava.com/api/v3/athletes/${athleteId}/stats`, {
    headers: { authorization: `Bearer ${accessToken}` },
  })
    .then((res) => res.json())
    .then((res: any) => {
      const {
        count,
        distance,
        moving_time: movingTime,
        elevation_gain: elevationGain,
      } = res.ytd_run_totals;

      return {
        athleteId, count, distance, movingTime, elevationGain,
      };
    });
}
