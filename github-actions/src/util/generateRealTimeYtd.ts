import { IAthleteYtd } from '../types/IAthleteYtd';
import { IYtd } from '../types/IYtd';
import { IYtdHistory } from '../types/IYtdHistory';

const getNewAthleteYtdHistory = (athleteYtds: IYtd[], currentYtd: IAthleteYtd) => {
  const latestYtdDate = Math.max(...athleteYtds.map((ytd) => ytd.date));

  if (latestYtdDate >= currentYtd.lastUpdated) {
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

export const generateRealTimeYtd = (ytd: IYtdHistory, currentYtds: IAthleteYtd[]) => {
  const realTimeYtd: IYtdHistory = {
    meta: { ...ytd.meta },
    athletes: ytd.athletes.map((athlete) => {
      const athleteCurrentYtd = currentYtds.find((a) => a.athleteId === athlete.athleteId);

      return {
        ...athlete,
        ytd: getNewAthleteYtdHistory(athlete.ytd, athleteCurrentYtd),
      };
    }),
  };

  return realTimeYtd;
};
