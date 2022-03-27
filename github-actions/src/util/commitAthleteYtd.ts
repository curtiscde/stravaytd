// import { spawn } from 'child_process';
import simpleGit, { SimpleGit, CleanOptions } from 'simple-git';
import * as core from '@actions/core';
import { IAthleteYtd } from '../types/IAthleteYtd';

export const commitAthleteYtd = async (athleteYtd: IAthleteYtd) => {
  const commitMessage = `🏃 Athlete ytd ${athleteYtd.athleteId} (r${athleteYtd.count})`;

  const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);

  await git.pull();
  await git.addConfig('user.email', 'actions@users.noreply.github.com');
  await git.addConfig('user.name', 'gh action bot');
  await git.add(`../data/current-ytd/athlete${athleteYtd.athleteId}.json`);
  await git.commit(commitMessage);
  await git.push();

  core.info(`new athlete ytd committed: '${commitMessage}'`);
};
