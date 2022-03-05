/* eslint-disable no-console */
import { Octokit } from '@octokit/core';
import { IAthleteYtd } from '../types/IAthleteYtd';

function mapAthleteYtdToString(athleteYtd: IAthleteYtd) {
  const {
    athleteId, count, distance, movingTime, elevationGain,
  } = athleteYtd;

  return {
    athleteid: athleteId.toString(),
    count: count.toString(),
    distance: distance.toString(),
    movingtime: movingTime.toString(),
    elevationgain: elevationGain.toString(),
  };
}

export async function dispatchAction(athleteYtd: IAthleteYtd) {
  const octokit = new Octokit({ auth: process.env.GITHUB_PAT });

  await octokit.request(`POST /repos/${process.env.GITHUB_REPO}/actions/workflows/update-current-ytd.yml/dispatches`, {
    ref: process.env.GITHUB_REF,
    inputs: mapAthleteYtdToString(athleteYtd),
  });
  console.log('update-current-ytd action dispatched');
}
