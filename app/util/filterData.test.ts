import { filterData, IAthlete } from './filterData';

const convertToTimestamp = (date: string) => new Date(date).getTime();

describe('filterData', () => {
  const athletes: Array<IAthlete> = [
    {
      athleteId: 1,
      ytd: [
        {
          date: convertToTimestamp('2021-02-02'), distance: 1, movingTime: 1, elevationGain: 1, count: 1,
        },
        {
          date: convertToTimestamp('2023-01-01'), distance: 2, movingTime: 2, elevationGain: 2, count: 2,
        },
        {
          date: convertToTimestamp('2023-01-02'), distance: 2, movingTime: 2, elevationGain: 2, count: 2,
        },
        {
          date: convertToTimestamp('2023-01-03'), distance: 2, movingTime: 2, elevationGain: 2, count: 2,
        },
        {
          date: convertToTimestamp('2023-01-04'), distance: 3, movingTime: 3, elevationGain: 3, count: 3,
        },
      ],
    },
  ];

  it('filters in-between data', () => {
    expect(filterData({
      athletes,
      propertyName: 'distance',
      year: 2023,
    })).toEqual([
      {
        athleteId: 1,
        ytd: [
          {
            date: convertToTimestamp('2023-01-01'), distance: 2, movingTime: 2, elevationGain: 2, count: 2,
          },
          {
            date: convertToTimestamp('2023-01-03'), distance: 2, movingTime: 2, elevationGain: 2, count: 2,
          },
          {
            date: convertToTimestamp('2023-01-04'), distance: 3, movingTime: 3, elevationGain: 3, count: 3,
          },
        ],
      },
    ]);
  });
});
