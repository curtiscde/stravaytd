import { IYtdHistory } from '../types/IYtdHistory';
import { generateNewYtd } from './generateNewYtd';

describe('generateNewYtd', () => {
  it('empty ytd, empty athletes', () => {
    expect(generateNewYtd({}, [], 123)).toEqual({
      meta: { version: 1, lastUpdated: 123 },
      athletes: [],
    });
  });

  it('empty ytd', () => {
    const athletes = [
      {
        athleteId: 1, distance: 2, count: 3, movingTime: 4, elevationGain: 5,
      },
      {
        athleteId: 2, distance: 6, count: 7, movingTime: 8, elevationGain: 9,
      },
    ];

    expect(generateNewYtd({}, athletes, 124)).toEqual({
      meta: { version: 1, lastUpdated: 124 },
      athletes: [
        {
          athleteId: 1,
          ytd: [
            {
              date: 124, distance: 2, count: 3, movingTime: 4, elevationGain: 5,
            },
          ],
        },
        {
          athleteId: 2,
          ytd: [
            {
              date: 124, distance: 6, count: 7, movingTime: 8, elevationGain: 9,
            },
          ],
        },
      ],
    });
  });

  it('existing ytd, updated athlete ytd', () => {
    const ytd: IYtdHistory = {
      meta: { version: 1, lastUpdated: 12345 },
      athletes: [
        {
          athleteId: 1,
          ytd: [
            {
              date: 12345, distance: 25, count: 3, movingTime: 400, elevationGain: 40,
            },
            {
              date: 12350, distance: 26, count: 4, movingTime: 450, elevationGain: 45,
            },
          ],
        },
        {
          athleteId: 2,
          ytd: [
            {
              date: 12345, distance: 30, count: 6, movingTime: 600, elevationGain: 60,
            },
            {
              date: 12350, distance: 40, count: 7, movingTime: 700, elevationGain: 85,
            },
          ],
        },
      ],
    };

    const athletes = [
      {
        athleteId: 1, distance: 50, count: 5, movingTime: 500, elevationGain: 50,
      },
      {
        athleteId: 2, distance: 60, count: 8, movingTime: 800, elevationGain: 90,
      },
    ];

    const expectedYtd: IYtdHistory = {
      meta: { version: 2, lastUpdated: 20000 },
      athletes: [
        {
          athleteId: 1,
          ytd: [
            {
              date: 12345, distance: 25, count: 3, movingTime: 400, elevationGain: 40,
            },
            {
              date: 12350, distance: 26, count: 4, movingTime: 450, elevationGain: 45,
            },
            {
              date: 20000, distance: 50, count: 5, movingTime: 500, elevationGain: 50,
            },
          ],
        },
        {
          athleteId: 2,
          ytd: [
            {
              date: 12345, distance: 30, count: 6, movingTime: 600, elevationGain: 60,
            },
            {
              date: 12350, distance: 40, count: 7, movingTime: 700, elevationGain: 85,
            },
            {
              date: 20000, distance: 60, count: 8, movingTime: 800, elevationGain: 90,
            },
          ],
        },
      ],
    };

    expect(generateNewYtd(ytd, athletes, 20000)).toEqual(expectedYtd);
  });
});
