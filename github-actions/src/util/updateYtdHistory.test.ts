import * as fsp from 'fs/promises';
import * as core from '@actions/core';
import { updateYtdHistory } from './updateYtdHistory';

const mockNewYtd = {
  meta: { lastUpdated: 5, version: 6 },
  athletes: [{
    athleteId: 1, distance: 2, count: 3, elevationGain: 4, movingTime: 5,
  }],
};

jest.mock('fs/promises');
jest.mock('@actions/core', () => ({ setOutput: jest.fn() }));
jest.mock('./getYtdHistory', () => ({
  getYtdHistory: () => ({
    meta: { lastUpdated: 1, version: 5 },
    athletes: [],
  }),
}));
jest.mock('./getAthletesCurrentYtd', () => ({
  getAthletesCurrentYtd: () => [],
}));
jest.mock('./generateNewYtd', () => ({
  generateNewYtd: () => mockNewYtd,
}));

describe('updateYtdHistory', () => {
  beforeAll(async () => {
    await updateYtdHistory();
  });

  it('writes file', () => {
    expect(fsp.writeFile).toHaveBeenCalledWith(
      '../app/data/ytdHistory.json',
      JSON.stringify(mockNewYtd),
    );
  });

  it('sets output', () => {
    expect(core.setOutput).toHaveBeenCalledWith('ytdVersion', mockNewYtd.meta.version);
  });
});
