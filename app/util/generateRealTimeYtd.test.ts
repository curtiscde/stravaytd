import { IAthleteYtd } from '../types/IAthleteYtd';
import { IYtdHistory } from '../types/IYtdHistory';
import { generateRealTimeYtd } from './generateRealTimeYtd';

const convertToTimestamp = (date: string) => new Date(date).getTime();
const now = convertToTimestamp('2023-02-02');

const meta = {
  version: 1,
  lastUpdated: convertToTimestamp('2023-01-01'),
};

const metaUpdated = {
  ...meta,
  lastUpdated: now,
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

const currentAthleteYtdB = {
  athleteId: 2,
  ytd: [{
    distance: 5000,
    movingTime: 566,
    elevationGain: 500,
    count: 2,
    date: convertToTimestamp('2023-01-01'),
  }],
};

describe('generateRealTimeYtd', () => {
  it('add current ytd', () => {
    const ytd: IYtdHistory = {
      meta,
      athletes: [currentAthleteYtdA],
    };
    const currentYtds: IAthleteYtd[] = [{
      athleteId: currentAthleteYtdA.athleteId,
      distance: 5000,
      movingTime: 566,
      elevationGain: 500,
      count: 2,
      lastUpdated: convertToTimestamp('2023-01-02'),
    }];
    expect(generateRealTimeYtd({ ytd, currentYtds, now })).toEqual({
      meta: metaUpdated,
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
    const currentYtds: IAthleteYtd[] = [{
      athleteId: currentAthleteYtdA.athleteId,
      distance: currentAthleteYtdA.ytd[0].distance,
      elevationGain: currentAthleteYtdA.ytd[0].elevationGain,
      movingTime: currentAthleteYtdA.ytd[0].movingTime,
      count: currentAthleteYtdA.ytd[0].count,
      lastUpdated: currentAthleteYtdA.ytd[0].date,
    }];
    expect(generateRealTimeYtd({ ytd, currentYtds, now })).toEqual({
      meta: metaUpdated,
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

  it('multiple athletes', () => {
    const ytd: IYtdHistory = {
      meta,
      athletes: [currentAthleteYtdA, currentAthleteYtdB],
    };
    const currentYtds: IAthleteYtd[] = [
      {
        athleteId: currentAthleteYtdA.athleteId,
        distance: currentAthleteYtdA.ytd[0].distance + 1,
        movingTime: currentAthleteYtdA.ytd[0].movingTime + 1,
        elevationGain: currentAthleteYtdA.ytd[0].elevationGain + 1,
        count: currentAthleteYtdA.ytd[0].count + 1,
        lastUpdated: convertToTimestamp('2023-01-02'),
      },
      {
        athleteId: currentAthleteYtdB.athleteId,
        distance: currentAthleteYtdB.ytd[0].distance + 1,
        movingTime: currentAthleteYtdB.ytd[0].movingTime + 1,
        elevationGain: currentAthleteYtdB.ytd[0].elevationGain + 1,
        count: currentAthleteYtdB.ytd[0].count + 1,
        lastUpdated: convertToTimestamp('2023-01-02'),
      },
    ];
    expect(generateRealTimeYtd({ ytd, currentYtds, now })).toEqual({
      meta: metaUpdated,
      athletes: [
        {
          ...currentAthleteYtdA,
          ytd: [
            ...currentAthleteYtdA.ytd,
            {
              distance: 4001,
              movingTime: 467,
              elevationGain: 401,
              count: 2,
              date: convertToTimestamp('2023-01-02'),
            }],
        },
        {
          ...currentAthleteYtdB,
          ytd: [
            ...currentAthleteYtdB.ytd,
            {
              distance: 5001,
              movingTime: 567,
              elevationGain: 501,
              count: 3,
              date: convertToTimestamp('2023-01-02'),
            }],
        },
      ],
    });
  });

  it('multiple athletes - only 1 has updates', () => {
    const ytd: IYtdHistory = {
      meta,
      athletes: [currentAthleteYtdA, currentAthleteYtdB],
    };
    const currentYtds: IAthleteYtd[] = [
      {
        athleteId: currentAthleteYtdA.athleteId,
        distance: currentAthleteYtdA.ytd[0].distance + 1,
        movingTime: currentAthleteYtdA.ytd[0].movingTime + 1,
        elevationGain: currentAthleteYtdA.ytd[0].elevationGain + 1,
        count: currentAthleteYtdA.ytd[0].count + 1,
        lastUpdated: convertToTimestamp('2023-01-02'),
      },
      {
        athleteId: currentAthleteYtdB.athleteId,
        distance: currentAthleteYtdB.ytd[0].distance,
        movingTime: currentAthleteYtdB.ytd[0].movingTime,
        elevationGain: currentAthleteYtdB.ytd[0].elevationGain,
        count: currentAthleteYtdB.ytd[0].count,
        lastUpdated: convertToTimestamp('2023-01-01'),
      },
    ];
    expect(generateRealTimeYtd({ ytd, currentYtds, now })).toEqual({
      meta: metaUpdated,
      athletes: [
        {
          ...currentAthleteYtdA,
          ytd: [
            ...currentAthleteYtdA.ytd,
            {
              distance: 4001,
              movingTime: 467,
              elevationGain: 401,
              count: 2,
              date: convertToTimestamp('2023-01-02'),
            }],
        },
        {
          ...currentAthleteYtdB,
          ytd: [
            ...currentAthleteYtdB.ytd,
          ],
        },
      ],
    });
  });

  it('multiple athletes - no updates', () => {
    const ytd: IYtdHistory = {
      meta,
      athletes: [currentAthleteYtdA, currentAthleteYtdB],
    };
    const currentYtds: IAthleteYtd[] = [
      {
        athleteId: currentAthleteYtdA.athleteId,
        distance: currentAthleteYtdA.ytd[0].distance,
        movingTime: currentAthleteYtdA.ytd[0].movingTime,
        elevationGain: currentAthleteYtdA.ytd[0].elevationGain,
        count: currentAthleteYtdA.ytd[0].count + 1,
        lastUpdated: convertToTimestamp('2023-01-01'),
      },
      {
        athleteId: currentAthleteYtdB.athleteId,
        distance: currentAthleteYtdB.ytd[0].distance,
        movingTime: currentAthleteYtdB.ytd[0].movingTime,
        elevationGain: currentAthleteYtdB.ytd[0].elevationGain,
        count: currentAthleteYtdB.ytd[0].count,
        lastUpdated: convertToTimestamp('2023-01-01'),
      },
    ];
    expect(generateRealTimeYtd({ ytd, currentYtds, now })).toEqual({
      meta: metaUpdated,
      athletes: [
        {
          ...currentAthleteYtdA,
          ytd: [...currentAthleteYtdA.ytd],
        },
        {
          ...currentAthleteYtdB,
          ytd: [...currentAthleteYtdB.ytd],
        },
      ],
    });
  });
});
