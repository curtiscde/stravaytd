import fsp from 'fs/promises';
import * as core from '@actions/core';
import { updateCurrentYtd } from './updateCurrentYtd';
import { getAthleteCurrentYtd } from './getAthleteCurrentYtd';

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
  const mockWriteFile = fsp.writeFile as jest.MockedFunction<typeof fsp.writeFile>;
  const mockGetAthleteCurrentYtd = getAthleteCurrentYtd as jest.MockedFunction<
    typeof getAthleteCurrentYtd
  >;

  const athleteId = 12345;
  const count = 11;
  const distance = 12;
  const movingTime = 13;
  const elevationGain = 14;

  beforeAll(() => {
    process.env.npm_config_athleteid = athleteId.toString();
    process.env.npm_config_count = count.toString();
    process.env.npm_config_distance = distance.toString();
    process.env.npm_config_movingtime = movingTime.toString();
    process.env.npm_config_elevationgain = elevationGain.toString();
  });

  describe('ytd has changed', () => {
    beforeAll(async () => {
      mockGetAthleteCurrentYtd.mockReturnValueOnce({
        athleteId,
        count: 10,
        distance: 11,
        movingTime: 12,
        elevationGain: 13,
      });

      await updateCurrentYtd();
    });

    afterAll(() => {
      mockWriteFile.mockClear();
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

  describe('ytd has not changed', () => {
    beforeAll(async () => {
      mockGetAthleteCurrentYtd.mockReturnValueOnce({
        athleteId,
        count,
        distance,
        movingTime,
        elevationGain,
      });

      await updateCurrentYtd();
    });

    it('does not write file', () => {
      expect(fsp.writeFile).not.toHaveBeenCalled();
    });

    it('logs no update', () => {
      expect(core.info).toHaveBeenCalledWith('no ytd updates');
    });
  });
});
