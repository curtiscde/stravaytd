/* eslint-disable no-console */
import { getWebhook } from './getWebhook';
import { postWebhook } from './postWebhook';

export const handleWebhook = async (event: any) => {
  console.log('webhook call');
  if (event.httpMethod === 'GET') {
    return getWebhook(event);
  }

  if (event.httpMethod === 'POST') {
    await postWebhook(event);
    return { statusCode: 200 };
  }

  return { statusCode: 404 };
};
