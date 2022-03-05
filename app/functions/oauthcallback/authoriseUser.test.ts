/* eslint-disable no-console */
import { isAthleteAllowed } from '../../util/isAthleteAllowed';
import { upsertUser } from './upsertUser';
import { authoriseUser } from './authoriseUser';

const authData = {
  athlete: { id: 'athleteid' },
  access_token: 'access_token',
};

jest.mock('./getAuthData', () => ({
  getAuthData: () => authData,
}));

jest.mock('../../util/isAthleteAllowed');
jest.mock('./upsertUser', () => ({ upsertUser: jest.fn() }));

describe('authoriseUser', () => {
  describe('user is allowed', () => {
    let res: any;

    beforeAll(async () => {
      const mockIsAthleteAllowed = isAthleteAllowed as jest.MockedFunction<typeof isAthleteAllowed>;
      mockIsAthleteAllowed.mockReturnValueOnce(true);
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

  describe('user is not allowed', () => {
    let res: any;

    beforeAll(async () => {
      const mockIsAthleteAllowed = isAthleteAllowed as jest.MockedFunction<typeof isAthleteAllowed>;
      mockIsAthleteAllowed.mockReturnValueOnce(false);
      res = await authoriseUser('foo');
    });

    it('returns authorised:false', () => {
      expect(res).toEqual({ authorised: false });
    });
  });
});
