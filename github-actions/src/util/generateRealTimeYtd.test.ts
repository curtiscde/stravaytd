import { IAthleteYtd } from '../types/IAthleteYtd';
import { IYtdHistory } from '../types/IYtdHistory';
import { generateRealTimeYtd } from './generateRealTimeYtd';

const convertToTimestamp = (date: string) => new Date(date).getTime();
const meta = {
  version: 1,
  lastUpdated: convertToTimestamp('2023-01-01'),
};

describe('generateRealTimeYtd', () => {
  it('add current ytd', () => {
    const ytd: IYtdHistory = {
      meta,
      athletes: [{
        athleteId: 1,
        ytd: [{
          distance: 4000,
          movingTime: 466,
          elevationGain: 400,
          count: 1,
          date: convertToTimestamp('2023-01-01'),
        }],
      }],
    };
    const athletesCurrentYtd: IAthleteYtd[] = [{
      athleteId: 1,
      distance: 5000,
      movingTime: 566,
      elevationGain: 500,
      count: 2,
      lastUpdated: convertToTimestamp('2023-01-02'),
    }];
    expect(generateRealTimeYtd(ytd, athletesCurrentYtd)).toEqual({
      meta: { version: 1, lastUpdated: convertToTimestamp('2023-01-01') },
      athletes: [{
        athleteId: 1,
        ytd: [{
          distance: 4000,
          movingTime: 466,
          elevationGain: 400,
          count: 1,
          date: convertToTimestamp('2023-01-01'),
        }, {
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
      athletes: [{
        athleteId: 12345,
        ytd: [{
          distance: 4000,
          movingTime: 466,
          elevationGain: 400,
          count: 1,
          date: convertToTimestamp('2023-01-01'),
        }],
      }],
    };
    const athletesCurrentYtd: IAthleteYtd[] = [{
      athleteId: 12345,
      distance: 4000,
      movingTime: 466,
      elevationGain: 400,
      count: 1,
      lastUpdated: convertToTimestamp('2023-01-01'),
    }];
    expect(generateRealTimeYtd(ytd, athletesCurrentYtd)).toEqual({
      meta: { version: 1, lastUpdated: convertToTimestamp('2023-01-01') },
      athletes: [{
        athleteId: 12345,
        ytd: [{
          distance: 4000,
          movingTime: 466,
          elevationGain: 400,
          count: 1,
          date: convertToTimestamp('2023-01-01'),
        }],
      }],
    });
  });
});
