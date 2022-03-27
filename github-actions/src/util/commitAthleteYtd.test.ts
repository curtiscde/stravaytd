import * as core from '@actions/core';
import { commitAthleteYtd } from './commitAthleteYtd';

jest.mock('@actions/core');

jest.mock('simple-git', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    clean: jest.fn(() => ({
      pull: jest.fn(),
      addConfig: jest.fn(),
      add: jest.fn(),
      commit: jest.fn(),
      push: jest.fn(),
    })),
  })),
  CleanOptions: { FORCE: '' },
}));

describe('commitAthleteYtd', () => {
  beforeAll(async () => {
    await commitAthleteYtd({
      athleteId: 12345,
      distance: 5000,
      movingTime: 566,
      elevationGain: 500,
      count: 2,
    });
  });

  it('commits', () => {
    expect(core.info).toHaveBeenCalledWith('new athlete ytd committed: \'🏃 Athlete ytd 12345 (r2)\'');
  });
});
