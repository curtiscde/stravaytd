import { generateNewYtd } from "./generateNewYtd"

describe('generateNewYtd', () => {
  it('returns meta data', () => {
    expect(generateNewYtd({}, {}, 123)).toEqual({
      meta: {
        version: 1,
        lastUpdated: 123,
      }
    })
  })
})
