/* eslint-disable no-console */
import { Handler } from '@netlify/functions';
import { getWebhook } from './getWebhook';
import { postWebhook } from './postWebhook';

require('dotenv').config();

export const handler: Handler = async (event) => {
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
