interface IYtd {
  date: number;
  count: number;
  distance: number;
  elevationGain: number;
  movingTime: number;
}

export interface IAthlete {
  athleteId: number,
  ytd: Array<IYtd>;
}

interface FilterDataArgs {
  athletes: Array<IAthlete>
  propertyName: IFilterPropertyName
  year: number
}

type IFilterPropertyName = 'count' | 'distance' | 'elevationGain' | 'movingTime';

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
