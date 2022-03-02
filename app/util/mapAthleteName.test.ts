import { mapAthleteName } from './mapAthleteName';

describe('mapAthleteName', () => {
  const allowedAthletes = '1:foo,2:bar,3,4:baz';

  it('returns name when found', () => {
    expect(mapAthleteName(allowedAthletes, 1)).toEqual('foo');
  });

  it('returns id when no matching name', () => {
    expect(mapAthleteName(allowedAthletes, 3)).toEqual('3');
  });

  it('returns id when not found', () => {
    expect(mapAthleteName(allowedAthletes, 5)).toEqual('5');
  });
});
