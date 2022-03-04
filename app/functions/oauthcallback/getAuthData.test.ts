import { getAuthData } from './getAuthData';
import { IOAuthTokenResponse } from './IOAuthTokenResponse';

jest.mock('node-fetch', () => {
  const generateResponse = () => ({
    json: () => ({
      access_token: 'access_token',
      refresh_token: 'refresh_token',
      athlete: {
        id: 12345,
      },
    }),
  });
  return jest.fn().mockResolvedValue(generateResponse());
});

describe('getAuthData', () => {
  let authData: IOAuthTokenResponse;
  beforeAll(async () => {
    authData = await getAuthData('foo');
  });

  it('returns auth data', () => {
    expect(authData).toEqual({
      access_token: 'access_token',
      athlete: {
        id: 12345,
      },
      refresh_token: 'refresh_token',
    });
  });
});
