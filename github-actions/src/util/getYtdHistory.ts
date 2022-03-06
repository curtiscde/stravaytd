import * as fs from 'fs';

export const getYtdHistory = (ytdFileLocation: string) => {
  const file = fs.readFileSync(ytdFileLocation, 'utf8');
  try {
    const ytd = JSON.parse(file);
    if (!ytd.athletes) return { athletes: [] };
    return ytd;
  } catch {
    return { athletes: [] };
  }
};
