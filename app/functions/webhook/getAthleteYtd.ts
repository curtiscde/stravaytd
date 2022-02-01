import fetch from "node-fetch";

interface IGetAthleteYtd {
  accessToken: string;
  athleteId: string;
}

export async function getAthleteYtd({ accessToken, athleteId }: IGetAthleteYtd) {
  return await fetch(`https://www.strava.com/api/v3/athletes/${athleteId}/stats`, {
    headers: {
      'authorization': `Bearer ${accessToken}`
    }
  })
    .then((res) => res.json())
    .then((res: any) => res.ytd_run_totals)
}