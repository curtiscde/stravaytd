import * as fs from 'fs';
import { YtdHistory } from '../types/YtdHistory';

const defaultYtd: YtdHistory = {
  athletes: [],
  meta: {
    version: 0,
    lastUpdated: 0,
  },
};

export const getYtdHistory = (ytdFileLocation: string): YtdHistory => {
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
