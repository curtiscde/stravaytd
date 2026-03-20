import fs from 'fs';
import { AthleteYtd } from '../types/AthleteYtd';
import { getAthleteCurrentYtd } from './getAthleteCurrentYtd';

jest.mock('fs');

describe('getAthleteCurrentYtd', () => {
  const mockReadFileSync = fs.readFileSync as jest.MockedFunction<typeof fs.readFileSync>;

  const mockAthleteYtd: AthleteYtd = {
    athleteId: 12345,
    distance: 4000,
    elevationGain: 500,
    movingTime: 456,
    count: 5,
  };

  let athleteYtd;

  beforeAll(() => {
    mockReadFileSync.mockReturnValue(JSON.stringify(mockAthleteYtd));

    athleteYtd = getAthleteCurrentYtd('foo', 12345);
  });

  it('returns athleteYtd', () => {
    expect(athleteYtd).toEqual(mockAthleteYtd);
  });
});
