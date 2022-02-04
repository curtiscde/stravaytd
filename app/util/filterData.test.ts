import { filterData, IAthlete } from "./filterData"

describe('filterData', () => {
  const athletes: Array<IAthlete> = [
    {
      athleteId: 1,
      ytd: [
        { date: 1, distance: 1, movingTime: 1, elevationGain: 1, count: 1 },
        { date: 2, distance: 2, movingTime: 2, elevationGain: 2, count: 2 },
        { date: 3, distance: 2, movingTime: 2, elevationGain: 2, count: 2 },
        { date: 4, distance: 2, movingTime: 2, elevationGain: 2, count: 2 },
        { date: 5, distance: 3, movingTime: 3, elevationGain: 3, count: 3 }
      ]
    }
  ]

  it('filters in-between data', () => {
    expect(filterData(athletes, 'distance')).toEqual([
      {
        athleteId: 1,
        ytd: [
          { date: 1, distance: 1, movingTime: 1, elevationGain: 1, count: 1 },
          { date: 2, distance: 2, movingTime: 2, elevationGain: 2, count: 2 },
          { date: 4, distance: 2, movingTime: 2, elevationGain: 2, count: 2 },
          { date: 5, distance: 3, movingTime: 3, elevationGain: 3, count: 3 }
        ]
      }
    ])
  })
})