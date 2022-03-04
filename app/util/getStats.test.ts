import { getStats } from './getStats';

jest.mock('fs', () => ({
  readFileSync: () => JSON.stringify({
    athletes: [
      {
        athleteId: 123,
        ytd: [
          {
            date: 1, distance: 10000, movingTime: 300, elevationGain: 3, count: 4,
          },
          {
            date: 2, distance: 12000, movingTime: 600, elevationGain: 7, count: 8,
          },
        ],
      },
      {
        athleteId: 456,
        ytd: [
          {
            date: 1, distance: 20000, movingTime: 300, elevationGain: 4, count: 5,
          },
          {
            date: 2, distance: 80000, movingTime: 900, elevationGain: 10, count: 11,
          },
        ],
      },
    ],
  }),
}));

describe('getStats', () => {
  let stats: any;

  beforeAll(() => {
    stats = getStats('123:foo,456:bar');
  });

  it('returns stats', () => {
    expect(stats).toMatchSnapshot();
  });
});
