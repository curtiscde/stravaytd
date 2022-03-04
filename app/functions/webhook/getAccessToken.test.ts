import fetch from 'node-fetch';
import { getAccessToken } from './getAccessToken';

jest.mock('node-fetch', () => {
  const generateResponse = () => ({ json: () => ({ access_token: 'access_token_value' }) });
  return jest.fn().mockResolvedValue(generateResponse());
});

const clientid = 'clientid';
const clientSecret = 'clientSecret';

describe('getAccessToken', () => {
  let accessToken: string;

  beforeAll(async () => {
    process.env.STRAVA_CLIENTID = clientid;
    process.env.STRAVA_CLIENTSECRET = clientSecret;
    accessToken = await getAccessToken('refresh_token_value');
  });

  it('calls fetch', () => {
    expect(fetch).toHaveBeenCalledWith('https://www.strava.com/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientid,
        client_secret: clientSecret,
        refresh_token: 'refresh_token_value',
        grant_type: 'refresh_token',
      }),
    });
  });

  it('returns access token', () => {
    expect(accessToken).toEqual('access_token_value');
  });
});
