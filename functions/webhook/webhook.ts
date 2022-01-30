import { Handler } from '@netlify/functions';

const getWebhook = (event: any) => {
  // Parses the query params
  const mode = event.queryStringParameters['hub.mode'];
  const token = event.queryStringParameters['hub.verify_token'];
  const challenge = event.queryStringParameters['hub.challenge'];
  // Checks if a token and mode is in the query string of the request
  if (mode && token) {
    // Verifies that the mode and token sent are valid
    if (mode === 'subscribe' && token === process.env.STRAVA_VERIFY_TOKEN) {
      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      return { statusCode: 200, body: JSON.stringify({ "hub.challenge": challenge }) }
    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      return { statusCode: 403 }
    }
  }

  return {
    statusCode: 500
  }
}

const postWebHook = (event: any) => {
  const body = JSON.parse(event.body);
  const {
    aspect_type: aspectType,
    object_id: objectId,
    object_type: objectType,
  } = body;

  console.log('aspectType', aspectType)
  console.log('objectId', objectId)
  console.log('objectType', objectType)

  return {
    statusCode: 200
  }
}

export const handler: Handler = async (event) => {
  console.log('webhook')
  if (event.httpMethod === 'GET') {
    return getWebhook(event);
  }

  if (event.httpMethod === 'POST') {
    return postWebHook(event);
  }

  return { statusCode: 404 }
};
