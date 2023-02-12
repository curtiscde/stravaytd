import { getStats } from './getStats';

const convertToTimestamp = (date: string) => new Date(date).getTime();

jest.mock('fs', () => ({
  readFileSync: () => JSON.stringify({
    athletes: [
      {
        athleteId: 123,
        ytd: [
          {
            date: convertToTimestamp('2021-02-02'), distance: 123, movingTime: 456, elevationGain: 7, count: 8,
          },
          {
            date: convertToTimestamp('2022-01-01'), distance: 10000, movingTime: 300, elevationGain: 3, count: 4,
          },
          {
            date: convertToTimestamp('2022-03-01'), distance: 12000, movingTime: 600, elevationGain: 7, count: 8,
          },
        ],
      },
      {
        athleteId: 456,
        ytd: [
          {
            date: convertToTimestamp('2021-02-02'), distance: 123, movingTime: 456, elevationGain: 7, count: 8,
          },
          {
            date: convertToTimestamp('2022-01-01'), distance: 20000, movingTime: 300, elevationGain: 4, count: 5,
          },
          {
            date: convertToTimestamp('2022-03-01'), distance: 80000, movingTime: 900, elevationGain: 10, count: 11,
          },
        ],
      },
    ],
  }),
}));
jest.mock('./getAthletesCurrentYtd', () => ({
  getAthletesCurrentYtd: () => [],
}));

describe('getStats', () => {
  let stats: any;

  describe('year 2022', () => {
    beforeAll(() => {
      stats = getStats({ allowedAthletes: '123:foo,456:bar', year: 2022 });
    });

    it('returns stats', () => {
      expect(stats).toMatchSnapshot();
    });
  });
});
