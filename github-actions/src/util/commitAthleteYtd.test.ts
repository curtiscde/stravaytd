import { spawn } from 'child_process';
import { commitAthleteYtd } from './commitAthleteYtd';

jest.mock('child_process', () => ({
  spawn: jest.fn(),
}));

describe('commitAthleteYtd', () => {
  beforeAll(() => {
    commitAthleteYtd({
      athleteId: 12345,
      distance: 5000,
      movingTime: 566,
      elevationGain: 500,
      count: 2,
    });
  });

  it('commits', () => {
    expect(spawn).toHaveBeenCalledWith('git', ['commit', '-m', '"🏃 Update athlete ytd 12345"']);
  });
});
