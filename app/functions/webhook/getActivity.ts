import fetch from "node-fetch";

interface IGetActivity {
  accessToken: string;
  activityId: string;
}

export async function getActivity({ accessToken, activityId }: IGetActivity) {
  return await fetch(`https://www.strava.com/api/v3/activities/${activityId}`, {
    headers: {
      'authorization': `Bearer ${accessToken}`
    }
  })
    .then((res) => res.json())
}