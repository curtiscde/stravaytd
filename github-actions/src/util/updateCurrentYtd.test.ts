import fsp from 'fs/promises';
import * as core from '@actions/core';
import { updateCurrentYtd } from './updateCurrentYtd';
import { commitAthleteYtd } from './commitAthleteYtd';
import { getAthleteCurrentYtd } from './getAthleteCurrentYtd';

jest.mock('fs', () => ({ existsSync: () => true }));
jest.mock('fs/promises', () => ({ writeFile: jest.fn() }));
jest.mock('@actions/core');
jest.mock('./commitAthleteYtd', () => ({
  commitAthleteYtd: jest.fn(),
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

  const newYtd = {
    athleteId, count, distance, movingTime, elevationGain,
  };

  beforeAll(() => {
    process.env.npm_config_athleteid = athleteId.toString();
    process.env.npm_config_count = count.toString();
    process.env.npm_config_distance = distance.toString();
    process.env.npm_config_movingtime = movingTime.toString();
    process.env.npm_config_elevationgain = elevationGain.toString();
  });

  describe('ytd has changed', () => {
    const mockDate = new Date('2023-01-01');

    beforeAll(async () => {
      jest
        .useFakeTimers()
        .setSystemTime(mockDate);

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
          ...newYtd,
          lastUpdated: mockDate.getTime(),
        }),
      );
    });

    it('calls commit', () => {
      expect(commitAthleteYtd).toHaveBeenCalledWith(newYtd);
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
      expect(core.info).toHaveBeenCalledWith('no ytd updates for athlete 12345');
    });
  });
});
