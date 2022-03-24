import { spawn } from 'child_process';
import { IAthleteYtd } from '../types/IAthleteYtd';

export const commitAthleteYtd = (athleteYtd: IAthleteYtd) => {
  spawn('git', ['pull']);
  spawn('git', ['diff']);
  spawn('git', ['config', '--global', 'user.email', '"actions@users.noreply.github.com"']);
  spawn('git', ['config', '--global', 'user.name', '"gh action bot"']);
  spawn('git', ['add', `../data/current-ytd/athlete${athleteYtd.athleteId}.json`]);
  spawn('git', ['commit', '-m', `🏃 Athlete YTD ${athleteYtd.athleteId} (run ${athleteYtd.count})`]);
  spawn('git', ['push']);
};
