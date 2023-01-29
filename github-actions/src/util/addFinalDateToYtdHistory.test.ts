import { IYtdHistory } from '../types/IYtdHistory';
import { addFinalDateToYtdHistory } from './addFinalDateToYtdHistory';

const convertToTimestamp = (date: string) => new Date(date).getTime();

describe('addFinalDateToYtdHistory', () => {
  it('returns ytds', () => {
    const ytdHistory: IYtdHistory = {
      meta: { version: 1, lastUpdated: new Date('2020-01-01').getTime() },
      athletes: [
        {
          athleteId: 1,
          ytd: [
            {
              count: 1,
              date: convertToTimestamp('2023-01-01'),
              distance: 1,
              elevationGain: 1,
              movingTime: 1,
            },
            {
              count: 2,
              date: convertToTimestamp('2023-01-02'),
              distance: 2,
              elevationGain: 2,
              movingTime: 2,
            },
          ],
        },
        {
          athleteId: 2,
          ytd: [
            {
              count: 1,
              date: convertToTimestamp('2023-01-01'),
              distance: 1,
              elevationGain: 1,
              movingTime: 1,
            },
          ],
        },
      ],
    };

    expect(
      addFinalDateToYtdHistory({ ytdHistory }),
    ).toEqual({
      meta: { version: 1, lastUpdated: new Date('2020-01-01').getTime() },
      athletes: [
        {
          athleteId: 1,
          ytd: [
            {
              count: 1,
              date: convertToTimestamp('2023-01-01'),
              distance: 1,
              elevationGain: 1,
              movingTime: 1,
            },
            {
              count: 2,
              date: convertToTimestamp('2023-01-02'),
              distance: 2,
              elevationGain: 2,
              movingTime: 2,
            },
          ],
        },
        {
          athleteId: 2,
          ytd: [
            {
              count: 1,
              date: convertToTimestamp('2023-01-01'),
              distance: 1,
              elevationGain: 1,
              movingTime: 1,
            },
            {
              count: 1,
              date: convertToTimestamp('2023-01-02'),
              distance: 1,
              elevationGain: 1,
              movingTime: 1,
            },
          ],
        },
      ],
    });
  });
});
