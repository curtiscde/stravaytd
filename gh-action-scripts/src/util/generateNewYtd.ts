import { IYtdHistory } from "../types/IYtdHistory";

function generateMeta(ytd, now) {
  return {
    lastUpdated: now,
    version: (ytd?.meta?.version || 0) + 1
  }
}

function generateAthletes(ytd: any, athletesYtd: any[], now: number) {
  const athletes = ytd.athletes ? ytd.athletes : [];

  athletes.forEach(athlete => {
    const newAthleteYtd = athletesYtd.find(a => a.athleteId === athlete.athleteId);
    athlete.ytd.push({
      date: now,
      count: newAthleteYtd.count,
      distance: newAthleteYtd.distance,
      movingTime: newAthleteYtd.movingTime,
      elevationGain: newAthleteYtd.elevationGain,
    })
  })

  athletesYtd
    .filter(a => !athletes.map(ath => ath.athleteId).includes(a.athleteId))
    .forEach(athlete => {
      const { athleteId, count, distance, movingTime, elevationGain } = athlete
      athletes.push({
        athleteId,
        ytd: [{ date: now, count, distance, movingTime, elevationGain }]
      })
    })

  return athletes
}

export function generateNewYtd(ytd: any, athletesYtd: any[], now: number): IYtdHistory {
  const newYtd = {
    meta: generateMeta(ytd, now),
    athletes: generateAthletes(ytd, athletesYtd, now),
  }

  return newYtd;
}
