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

type IFilterPropertyName = 'count' | 'distance' | 'elevationGain' | 'movingTime';

export function filterData(athletes: Array<IAthlete>, propertyName: IFilterPropertyName) {
  return athletes.map((athlete) => ({
    ...athlete,
    ytd: athlete.ytd.filter((d, i) => {
      const previousD = athlete.ytd[i - 1];
      const nextD = athlete.ytd[i + 1];

      if (!previousD || !nextD) return true;

      return !(previousD[propertyName] === d[propertyName]
        && nextD[propertyName] === d[propertyName]);
    }),
  }));
}
