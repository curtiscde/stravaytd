import { spawn } from 'child_process';
import { IAthleteYtd } from '../types/IAthleteYtd';

export const commitAthleteYtd = (athleteYtd: IAthleteYtd) => {
  spawn('git', ['pull']);
  spawn('git', ['diff']);
  spawn('git', ['config', '--global', 'user.email', '"actions@users.noreply.github.com"']);
  spawn('git', ['config', '--global', 'user.name', '"gh action bot"']);
  spawn('git', ['add', '-A']);
  spawn('git', ['commit', '-m', `"🏃 Update athlete ytd ${athleteYtd.athleteId}"`]);
  spawn('git', ['push']);
};