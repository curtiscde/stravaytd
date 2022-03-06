import { getYtdHistory } from './getYtdHistory';

jest.mock('fs', () => ({
  readFileSync: () => JSON.stringify({
    meta: {
      version: 1,
      lastUpdated: 123,
    },
    athletes: [{
      athleteId: 123,
      ytd: [],
    }],
  }),
}));

describe('getYtdHistory', () => {
  let ytd: any;

  beforeAll(() => {
    ytd = getYtdHistory('foo');
  });

  it('returns ytd data', () => {
    expect(ytd).toEqual({
      athletes: [{ athleteId: 123, ytd: [] }], meta: { lastUpdated: 123, version: 1 },
    });
  });
});
