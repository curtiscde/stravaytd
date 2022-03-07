import { getWebhook } from './getWebhook';
import { postWebhook } from './postWebhook';
import { handleWebhook } from './handleWebhook';

jest.mock('./getWebhook', () => ({ getWebhook: jest.fn() }));
jest.mock('./postWebhook', () => ({ postWebhook: jest.fn() }));

describe('handleWebhook', () => {
  describe('get', () => {
    const event = {
      httpMethod: 'GET',
    };

    beforeAll(async () => {
      await handleWebhook(event);
    });

    it('calls getWebhook', () => {
      expect(getWebhook).toHaveBeenCalledWith(event);
    });
  });

  describe('post', () => {
    const event = {
      httpMethod: 'POST',
    };

    beforeAll(async () => {
      await handleWebhook(event);
    });

    it('calls postWebhook', () => {
      expect(postWebhook).toHaveBeenCalledWith(event);
    });
  });
});
