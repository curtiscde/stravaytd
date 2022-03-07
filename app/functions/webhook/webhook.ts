/* eslint-disable no-console */
import { Handler } from '@netlify/functions';
import { handleWebhook } from './handleWebhook';

export const handler: Handler = async (event) => handleWebhook(event);
