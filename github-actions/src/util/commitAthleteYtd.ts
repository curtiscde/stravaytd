// import { spawn } from 'child_process';
import simpleGit, { SimpleGit, CleanOptions } from 'simple-git';
import { IAthleteYtd } from '../types/IAthleteYtd';

export const commitAthleteYtd = async (athleteYtd: IAthleteYtd) => {
  const commitMessage = `🏃 Athlete YTD ${athleteYtd.athleteId} (run ${athleteYtd.count})`;

  const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);

  await git.pull();
  await git.addConfig('user.email', 'actions@users.noreply.github.com');
  await git.addConfig('user.name', 'gh action bot');
  await git.add(`../data/current-ytd/athlete${athleteYtd.athleteId}.json`);
  await git.commit(commitMessage);
  await git.push();

  // spawn('git', ['pull']);
  // spawn('git', ['diff']);
  // spawn('git', ['config', '--global', 'user.email', '"actions@users.noreply.github.com"']);
  // spawn('git', ['config', '--global', 'user.name', '"gh action bot"']);
  // spawn('git', ['add', `../data/current-ytd/athlete${athleteYtd.athleteId}.json`], { stdio: 'inherit' });
  // spawn('git', ['commit', '-m', commitMessage], { stdio: 'inherit' });
  // spawn('git', ['push']);
};
