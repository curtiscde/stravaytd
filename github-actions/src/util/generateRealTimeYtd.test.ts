import { IAthleteYtd } from '../types/IAthleteYtd';
import { IYtdHistory } from '../types/IYtdHistory';
import { generateRealTimeYtd } from './generateRealTimeYtd';

const convertToTimestamp = (date: string) => new Date(date).getTime();
const meta = {
  version: 1,
  lastUpdated: convertToTimestamp('2023-01-01'),
};

const currentAthleteYtdA = {
  athleteId: 1,
  ytd: [{
    distance: 4000,
    movingTime: 466,
    elevationGain: 400,
    count: 1,
    date: convertToTimestamp('2023-01-01'),
  }],
};

describe('generateRealTimeYtd', () => {
  it('add current ytd', () => {
    const ytd: IYtdHistory = {
      meta,
      athletes: [currentAthleteYtdA],
    };
    const athletesCurrentYtd: IAthleteYtd[] = [{
      athleteId: currentAthleteYtdA.athleteId,
      distance: 5000,
      movingTime: 566,
      elevationGain: 500,
      count: 2,
      lastUpdated: convertToTimestamp('2023-01-02'),
    }];
    expect(generateRealTimeYtd(ytd, athletesCurrentYtd)).toEqual({
      meta,
      athletes: [{
        ...currentAthleteYtdA,
        ytd: [
          ...currentAthleteYtdA.ytd,
          {
            distance: 5000,
            movingTime: 566,
            elevationGain: 500,
            count: 2,
            date: convertToTimestamp('2023-01-02'),
          }],
      }],
    });
  });

  it('current ytd already exists', () => {
    const ytd: IYtdHistory = {
      meta,
      athletes: [currentAthleteYtdA],
    };
    const athletesCurrentYtd: IAthleteYtd[] = [{
      athleteId: currentAthleteYtdA.athleteId,
      distance: currentAthleteYtdA.ytd[0].distance,
      elevationGain: currentAthleteYtdA.ytd[0].elevationGain,
      movingTime: currentAthleteYtdA.ytd[0].movingTime,
      count: currentAthleteYtdA.ytd[0].count,
      lastUpdated: currentAthleteYtdA.ytd[0].date,
    }];
    expect(generateRealTimeYtd(ytd, athletesCurrentYtd)).toEqual({
      meta,
      athletes: [
        {
          ...currentAthleteYtdA,
          ytd: [
            ...currentAthleteYtdA.ytd,
          ],
        },
      ],
    });
  });
});
