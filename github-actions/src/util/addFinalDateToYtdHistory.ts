import { IYtd } from '../types/IYtd';
import { IYtdHistory } from '../types/IYtdHistory';

const getMaxDate = (ytdHistory: IYtdHistory): number => ytdHistory
  .athletes
  .map((athlete) => athlete.ytd.map((ytd) => ytd.date))
  .flat(1)
  .reduce((acc, curr) => ((curr > acc) ? curr : acc), 0);
interface GetAthleteYtdProps {
  ytds: IYtd[],
  maxDate: number
}

const getAthleteYtd = ({ ytds, maxDate }: GetAthleteYtdProps) => {
  const maxDateForAthlete = ytds.map((ytd) => ytd.date)
    .reduce((acc, curr) => ((curr > acc) ? curr : acc), 0);
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
