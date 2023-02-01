import { IYtd } from '../types/IYtd';
import { filterYtdRecords } from './filterYtdRecords';

const convertToTimestamp = (date: string) => new Date(date).getTime();

const ytdA: IYtd = {
  count: 1,
  distance: 1,
  elevationGain: 1,
  movingTime: 1,
  date: convertToTimestamp('2023-01-01'),
};

const ytdB: IYtd = {
  count: 2,
  distance: 2,
  elevationGain: 2,
  movingTime: 2,
  date: convertToTimestamp('2023-01-01'),
};

describe('filterYtdRecords', () => {
  it('returns same when nothing to filter', () => {
    expect(
      filterYtdRecords({
        ytds: [
          { ...ytdA, date: convertToTimestamp('2023-01-01') },
          { ...ytdB, date: convertToTimestamp('2023-01-02') },
        ],
      }),
    ).toEqual([
      { ...ytdA, date: convertToTimestamp('2023-01-01') },
      { ...ytdB, date: convertToTimestamp('2023-01-02') },
    ]);
  });

  it('returns filtered results', () => {
    expect(
      filterYtdRecords({
        ytds: [
          { ...ytdA, date: convertToTimestamp('2023-01-01') },
          { ...ytdA, date: convertToTimestamp('2023-01-02') },
          { ...ytdA, date: convertToTimestamp('2023-01-03') },
          { ...ytdB, date: convertToTimestamp('2023-01-04') },
          { ...ytdB, date: convertToTimestamp('2023-01-05') },
        ],
      }),
    ).toEqual([
      { ...ytdA, date: convertToTimestamp('2023-01-01') },
      { ...ytdA, date: convertToTimestamp('2023-01-03') },
      { ...ytdB, date: convertToTimestamp('2023-01-04') },
      { ...ytdB, date: convertToTimestamp('2023-01-05') },
    ]);
  });
});
