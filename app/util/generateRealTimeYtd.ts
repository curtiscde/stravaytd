import { AthleteYtd } from '../types/AthleteYtd';
import { Ytd } from '../types/Ytd';
import { YtdHistory } from '../types/YtdHistory';

const getNewAthleteYtdHistory = (athleteYtds: Ytd[], currentYtd: AthleteYtd) => {
  const latestYtdDate = Math.max(...athleteYtds.map((ytd) => ytd.date));

  if (currentYtd.lastUpdated === undefined || latestYtdDate >= currentYtd.lastUpdated) {
    return athleteYtds;
  }

  return athleteYtds.concat([{
    date: currentYtd.lastUpdated,
    count: currentYtd.count,
    distance: currentYtd.distance,
    elevationGain: currentYtd.elevationGain,
    movingTime: currentYtd.movingTime,
  }]);
};

interface GenerateRealTimeYtdProps {
  ytd: YtdHistory
  currentYtds: AthleteYtd[]
  now: number;
}

export const generateRealTimeYtd = ({
  ytd, currentYtds, now,
}: GenerateRealTimeYtdProps): YtdHistory => {
  const updatedMeta = {
    ...ytd.meta,
    lastUpdated: now,
  };

  const realTimeYtd: YtdHistory = {
    meta: updatedMeta,
    athletes: ytd.athletes.map((athlete) => {
      const athleteCurrentYtd = currentYtds.find((a) => a.athleteId === athlete.athleteId);

      if (athleteCurrentYtd === undefined) {
        return {
          ...athlete,
        };
      }

      return {
        ...athlete,
        ytd: getNewAthleteYtdHistory(athlete.ytd, athleteCurrentYtd),
      };
    }),
  };

  return realTimeYtd;
};
