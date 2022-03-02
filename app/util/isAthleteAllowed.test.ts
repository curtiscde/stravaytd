import { isAthleteAllowed } from './isAthleteAllowed';

describe('isAthleteAllowed', () => {
  it('returns false when an id is not recognised', () => {
    expect(isAthleteAllowed('1,2,3', 5)).toEqual(false);
  });

  it('returns true when an id is recognised', () => {
    expect(isAthleteAllowed('1,2,3', 3)).toEqual(true);
  });

  it('returns true when an id is recognised with a name', () => {
    expect(isAthleteAllowed('1:foo,2:bar,3:baz', 3)).toEqual(true);
  });
});
