/* eslint-disable no-console */
require('dotenv').config();

interface IGetWebhook {
  statusCode: number;
  body?: string;
}

export const getWebhook = (event: any): IGetWebhook => {
  const mode = event.queryStringParameters['hub.mode'];
  const token = event.queryStringParameters['hub.verify_token'];
  const challenge = event.queryStringParameters['hub.challenge'];
  if (mode && token) {
    if (mode === 'subscribe' && token === process.env.STRAVA_VERIFY_TOKEN) {
      console.log('WEBHOOK_VERIFIED');
      return { statusCode: 200, body: JSON.stringify({ 'hub.challenge': challenge }) };
    }
    return { statusCode: 403 };
  }

  return {
    statusCode: 500,
  };
};
