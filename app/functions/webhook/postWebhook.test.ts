import { dispatchAction } from '../util/dispatchAction';
import { postWebhook } from './postWebhook';

const athleteYtd = {
  athleteId: 1,
  count: 2,
  distance: 3,
  movingTime: 4,
  elevationGain: 5,
};

jest.mock('./getToken', () => ({ getToken: () => 'foo' }));
jest.mock('./decrypt', () => ({ decrypt: () => 'foo' }));
jest.mock('./getAccessToken', () => ({ getAccessToken: () => 'foo' }));
jest.mock('../util/getAthleteYtd', () => ({ getAthleteYtd: () => athleteYtd }));
jest.mock('../util/dispatchAction', () => ({ dispatchAction: jest.fn() }));

describe('postWebhook', () => {
  beforeAll(async () => {
    jest.spyOn(global.console, 'log');
    const event = {
      body: JSON.stringify({ owner_id: 12345 }),
    };
    await postWebhook(event);
  });

  it('should log', () => {
    expect(console.log).toHaveBeenCalledWith('postWebhook call');
  });

  it('should call dispatchAction', () => {
    expect(dispatchAction).toHaveBeenCalledWith(athleteYtd);
  });
});
