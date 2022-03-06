import { getAthletesCurrentYtd } from './getAthletesCurrentYtd';

const mockYtd = {
  distance: 1, movingTime: 2, elevationGain: 3, count: 4,
};
const mockFiles = {
  'foo/athlete123.json': { ...mockYtd, athleteId: 123 },
  'foo/athlete456.json': { ...mockYtd, athleteId: 456 },
};

jest.mock('fs', () => ({
  readdirSync: () => ['athlete123.json', 'athlete456.json'],
  readFileSync: (file) => JSON.stringify(mockFiles[file]),
}));

jest.mock('path', () => ({
  join: () => '',
}));

describe('getAthletesCurrentYtd', () => {
  let athletesYtd;

  beforeAll(() => {
    athletesYtd = getAthletesCurrentYtd('foo');
  });

  it('returns athletesYtd', () => {
    expect(athletesYtd).toEqual([
      { ...mockFiles['foo/athlete123.json'] },
      { ...mockFiles['foo/athlete456.json'] },
    ]);
  });
});
