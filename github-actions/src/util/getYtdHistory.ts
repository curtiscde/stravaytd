import * as fs from 'fs';
import { IYtdHistory } from '../types/IYtdHistory';

const defaultYtd: IYtdHistory = {
  athletes: [],
  meta: {
    version: 0,
    lastUpdated: 0,
  },
};

export const getYtdHistory = (ytdFileLocation: string): IYtdHistory => {
  const file = fs.readFileSync(ytdFileLocation, 'utf8');
  try {
    const ytd = JSON.parse(file);
    if (!ytd.athletes) return defaultYtd;
    return ytd;
  } catch {
    // eslint-disable-next-line no-console
    console.log('could not get current ytdHistory');
    return defaultYtd;
  }
};
