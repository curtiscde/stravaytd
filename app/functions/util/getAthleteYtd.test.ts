import { IAthleteYtd } from '../types/IAthleteYtd';
import { getAthleteYtd } from './getAthleteYtd';

jest.mock('node-fetch', () => {
  const generateResponse = () => ({
    json: () => ({
      ytd_run_totals: {
        count: 1,
        distance: 2,
        moving_time: 3,
        elevation_gain: 4,
      },
    }),
  });
  return jest.fn().mockResolvedValue(generateResponse());
});

describe('getAthleteYtd', () => {
  let athleteYtd: IAthleteYtd;
  beforeAll(async () => {
    athleteYtd = await getAthleteYtd({ accessToken: 'foo', athleteId: 123 });
  });

  it('returns athlete ytd', () => {
    expect(athleteYtd).toEqual({
      athleteId: 123,
      count: 1,
      distance: 2,
      elevationGain: 4,
      movingTime: 3,
    });
  });
});
