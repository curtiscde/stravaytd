import { AthleteData } from '../types/AthleteData';

export const getYears = ({ athletes }: { athletes: AthleteData[] }): number[] => athletes
  .map((athlete) => athlete.ytd.map((ytd) => new Date(ytd.date).getFullYear()))
  .flat(1)
  .filter((value, index, self) => index === self.findIndex((year) => (
    year === value
  )))
  .sort();
