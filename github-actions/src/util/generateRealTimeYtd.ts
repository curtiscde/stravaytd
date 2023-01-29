import { IAthleteYtd } from '../types/IAthleteYtd';
import { IYtd } from '../types/IYtd';
import { IYtdHistory } from '../types/IYtdHistory';

const getNewAthleteYtdHistory = (athleteYtds: IYtd[], currentYtd: IAthleteYtd) => {
  const alreadyExists = athleteYtds.find((ytd) => ytd.date === currentYtd.lastUpdated);
  if (alreadyExists !== undefined) {
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
