import { handleOauthcallback } from './handleOauthcallback';
import { IAthleteYtd } from '../types/IAthleteYtd';
import { authoriseUser } from './authoriseUser';
import { dispatchAction } from '../util/dispatchAction';

const mockAthleteYtd: IAthleteYtd = {
  athleteId: 123,
  movingTime: 1,
  distance: 2,
  count: 3,
  elevationGain: 4,
};

jest.mock('./authoriseUser', () => ({
  authoriseUser: jest.fn(),
}));

jest.mock('../util/getAthleteYtd', () => ({
  getAthleteYtd: jest.fn(() => mockAthleteYtd),
}));

jest.mock('../util/dispatchAction', () => ({
  dispatchAction: jest.fn(),
}));

describe('handleOauthcallback', () => {
  const event = {
    queryStringParameters: { code: 'qspcode' },
  };

  describe('authorised', () => {
    let response: any;

    beforeAll(async () => {
      authoriseUser.mockReturnValue({ authorised: true, authData: { accessToken: 'foo', athleteId: 123 } });
      response = await handleOauthcallback(event);
    });

    it('calls authoriseUser', () => {
      expect(authoriseUser).toHaveBeenCalledWith('qspcode');
    });

    it('calls dispatchAction', () => {
      expect(dispatchAction).toHaveBeenCalledWith(mockAthleteYtd);
    });

    it('returns 200', () => {
      expect(response).toEqual({
        statusCode: 200,
        body: JSON.stringify({
          verified: true,
          ytdSet: true,
        }),
      });
    });
  });

  describe('unauthorised', () => {
    let response: any;

    beforeAll(async () => {
      authoriseUser.mockReturnValue({ authorised: false });
      response = await handleOauthcallback(event);
    });

    it('returns 401', () => {
      expect(response).toEqual({
        statusCode: 401,
      });
    });
  });
});
