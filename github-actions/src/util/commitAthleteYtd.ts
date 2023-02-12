import simpleGit, { SimpleGit, CleanOptions } from 'simple-git';
import * as core from '@actions/core';
import { IAthleteYtd } from '../types/IAthleteYtd';

const generateCommitMessage = (athleteYtd: IAthleteYtd) => {
  const { athleteId, lastUpdated, count } = athleteYtd;
  const year = new Date(lastUpdated).getFullYear();
  return `🏃 Athlete ytd ${athleteId} (y${year} / r${count})`;
};

export const commitAthleteYtd = async (athleteYtd: IAthleteYtd) => {
  const commitMessage = generateCommitMessage(athleteYtd);

  const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);

  await git.pull();
  await git.addConfig('user.email', 'actions@users.noreply.github.com');
  await git.addConfig('user.name', 'gh action bot');
  await git.add(`../data/current-ytd/athlete${athleteYtd.athleteId}.json`);
  await git.add(`../app/data/current-ytd/athlete${athleteYtd.athleteId}.json`);
  await git.commit(commitMessage);
  await git.push();

  core.info(`new athlete ytd committed: '${commitMessage}'`);
};
