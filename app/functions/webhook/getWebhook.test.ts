/* eslint-disable no-console */
import { getWebhook } from './getWebhook';

describe('getWebhook', () => {
  describe('verified', () => {
    let response: any;

    beforeAll(() => {
      jest.spyOn(global.console, 'log');

      process.env.STRAVA_VERIFY_TOKEN = 'foo_token';
      const event = {
        queryStringParameters: {
          'hub.mode': 'subscribe',
          'hub.verify_token': 'foo_token',
          'hub.challenge': 'foo_challenge',
        },
      };

      response = getWebhook(event);
    });

    it('logs verified', () => {
      expect(console.log).toHaveBeenCalledWith('WEBHOOK_VERIFIED');
    });

    it('returns 200', () => {
      expect(response).toEqual({
        statusCode: 200,
        body: '{"hub.challenge":"foo_challenge"}',
      });
    });
  });

  describe('not verified', () => {
    let response: any;

    beforeAll(() => {
      process.env.STRAVA_VERIFY_TOKEN = 'foo_token';
      const event = {
        queryStringParameters: {
          'hub.mode': 'subscribe',
          'hub.verify_token': 'bar_token',
          'hub.challenge': 'foo_challenge',
        },
      };

      response = getWebhook(event);
    });

    it('returns 403', () => {
      expect(response).toEqual({
        statusCode: 403,
      });
    });
  });
});
