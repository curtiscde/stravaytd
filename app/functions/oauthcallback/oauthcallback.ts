import { Handler } from '@netlify/functions';
import { handleOauthcallback } from './handleOauthcallback';

export const handler: Handler = async (event: any) => handleOauthcallback(event);
