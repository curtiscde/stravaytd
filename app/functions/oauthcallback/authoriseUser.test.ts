/* eslint-disable no-console */
import { authoriseUser } from './authoriseUser';
import { upsertUser } from './upsertUser';

const authData = {
  athlete: { id: 'athleteid' },
  access_token: 'access_token',
};

jest.mock('./getAuthData', () => ({
  getAuthData: () => authData,
}));

jest.mock('../../util/isAthleteAllowed', () => ({
  isAthleteAllowed: () => true,
}));

jest.mock('./upsertUser');

describe('authoriseUser', () => {
  let res: any;

  beforeAll(async () => {
    jest.spyOn(global.console, 'log');
    res = await authoriseUser('foo');
  });

  it('calls upsertUser', () => {
    expect(upsertUser).toHaveBeenCalledWith(authData);
  });

  it('logs', () => {
    expect(console.log).toHaveBeenCalledWith('user added');
  });

  it('returns access token and athleteid', () => {
    expect(res).toEqual({
      authorised: true,
      authData: {
        accessToken: 'access_token',
        athleteId: 'athleteid',
      },
    });
  });
});
