interface Ytd {
  date: number;
  distance: number;
  movingTime: number;
  elevationGain: number;
  count: number;
}

export interface AthleteData {
  athleteId: number;
  ytd: Ytd[];
}
