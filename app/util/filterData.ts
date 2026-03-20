interface Ytd {
  date: number;
  count: number;
  distance: number;
  elevationGain: number;
  movingTime: number;
}

export interface Athlete {
  athleteId: number,
  ytd: Array<Ytd>;
}

interface FilterDataArgs {
  athletes: Array<Athlete>
  propertyName: FilterPropertyName
  year: number
}

type FilterPropertyName = 'count' | 'distance' | 'elevationGain' | 'movingTime';

export function filterData({ athletes, propertyName, year }: FilterDataArgs) {
  return athletes.map((athlete) => ({
    ...athlete,
    ytd: athlete.ytd.filter((d, i) => {
      const ytdYear = new Date(d.date).getFullYear();
      if (ytdYear !== year) return false;

      const previousD = athlete.ytd[i - 1];
      const nextD = athlete.ytd[i + 1];

      if (!previousD || !nextD) return true;

      return !(previousD[propertyName] === d[propertyName]
        && nextD[propertyName] === d[propertyName]);
    }),
  }));
}
