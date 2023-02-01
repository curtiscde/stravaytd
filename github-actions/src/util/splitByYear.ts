import * as fsp from 'fs/promises';
import { IYtdHistory } from '../types/IYtdHistory';
import { filterYtdRecords } from './filterYtdRecords';
import { getYtdHistory } from './getYtdHistory';

const ytdFileLocation = '../data/ytdHistory.json';

const countYtds = (yearYtd: IYtdHistory) => yearYtd.athletes
  .map((a) => a.ytd)
  .flat(1)
  .length;

const getYears = ({ athletes }: { athletes }): number[] => athletes
  .map((athlete) => athlete.ytd.map((ytd) => new Date(ytd.date).getFullYear()))
  .flat(1)
  .filter((value, index, self) => index === self.findIndex((year) => (
    year === value
  )))
  .sort();

const createYtdForYear = async ({ year, ytd }: { year: number, ytd: IYtdHistory }) => {
  const yearYtd: IYtdHistory = {
    ...ytd,
    athletes: ytd.athletes.map((athlete) => ({
      ...athlete,
      ytd: athlete.ytd.filter((ytdRecord) => new Date(ytdRecord.date).getFullYear() === year),
    })),
  };

  console.log(`year ${year} records: ${countYtds(yearYtd)}`);

  const yearYtdFiltered: IYtdHistory = {
    ...yearYtd,
    athletes: yearYtd.athletes.map((athlete) => ({
      ...athlete,
      ytd: filterYtdRecords({ ytds: athlete.ytd }),
    })),
  };

  console.log(`year ${year} records (filtered): ${countYtds(yearYtdFiltered)}`);

  await fsp.writeFile(`../data/ytdHistory-${year}.json`, JSON.stringify(yearYtdFiltered));
  console.log(`created ytdHistory-${year}.json`);
};

export const splitByYear = async () => {
  const ytd = getYtdHistory(ytdFileLocation);
  const years = getYears({ athletes: ytd.athletes });

  console.log('years', years);

  years.forEach((year) => {
    createYtdForYear({ year, ytd });
  });
};
