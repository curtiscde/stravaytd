import { getStats } from '../../util/getStats'
import { getStaticProps } from '../../pages/index'

const distanceData = 1
const runsData = 2
const movingTimeData = 3
const elevationGainData = 4

jest.mock('../../util/getStats', () => {
  return {
    getStats: () => {
      return {
        distanceData,
        runsData,
        movingTimeData,
        elevationGainData,
      }
    }
  }
})

describe('getStaticProps', () => {
  it('returns props', async () => {
    expect(await getStaticProps()).toEqual({
      props: {
        distanceData,
        runsData,
        movingTimeData,
        elevationGainData,
      },
    })
  })
})