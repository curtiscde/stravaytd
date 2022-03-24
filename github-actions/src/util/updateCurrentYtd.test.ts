import fsp from 'fs/promises';
import { updateCurrentYtd } from './updateCurrentYtd';

jest.mock('fs', () => ({
  existsSync: () => true,
  readFileSync: jest.fn(),
}));
jest.mock('fs/promises');
jest.mock('@actions/core');
jest.mock('child_process', () => ({
  spawn: jest.fn(),
}));
jest.mock('./getAthleteCurrentYtd');

describe('updateCurrentYtd', () => {
  const athleteId = 12345;
  const count = 11;
  const distance = 12;
  const movingTime = 13;
  const elevationGain = 14;

  beforeAll(async () => {
    process.env.npm_config_athleteid = athleteId.toString();
    process.env.npm_config_count = count.toString();
    process.env.npm_config_distance = distance.toString();
    process.env.npm_config_movingtime = movingTime.toString();
    process.env.npm_config_elevationgain = elevationGain.toString();

    await updateCurrentYtd();
  });

  it('writes file', () => {
    expect(fsp.writeFile).toHaveBeenCalledWith(
      '../data/current-ytd/athlete12345.json',
      JSON.stringify({
        athleteId,
        count,
        distance,
        movingTime,
        elevationGain,
      }),
    );
  });
});
