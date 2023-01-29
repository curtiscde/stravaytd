import { IYtd } from '../types/IYtd';
import { IYtdHistory } from '../types/IYtdHistory';

const getMaxDate = (ytdHistory: IYtdHistory): number => Math.max(
  ...ytdHistory
    .athletes
    .map((athlete) => athlete.ytd.map((ytd) => ytd.date))
    .flat(1),
);

interface GetAthleteYtdProps {
  ytds: IYtd[],
  maxDate: number
}

const getAthleteYtd = ({ ytds, maxDate }: GetAthleteYtdProps) => {
  const maxDateForAthlete = Math.max(...ytds.map((ytd) => ytd.date));
  const latestYtd = ytds.find((ytd) => ytd.date === maxDateForAthlete);

  if (maxDateForAthlete >= maxDate) {
    return ytds;
  }

  return ytds.concat([
    {
      ...latestYtd,
      date: maxDate,
    },
  ]);
};

export const addFinalDateToYtdHistory = ({
  ytdHistory,
}: { ytdHistory: IYtdHistory }): IYtdHistory => {
  const maxDate = getMaxDate(ytdHistory);

  return {
    ...ytdHistory,
    athletes: ytdHistory.athletes
      .map((athlete) => ({
        ...athlete,
        ytd: getAthleteYtd({ ytds: athlete.ytd, maxDate }),
      })),
  };
};
