export function mapAthleteName(allowedAthletes: string, athleteId: number): string {
  const athlete = allowedAthletes
    .split(',')
    .map((a: string) => {
      const athlete = a.split(':');
      return { id: Number(athlete[0]), name: athlete[1] }
    })
    .find((a) => a.id === athleteId);

  if (!athlete || !athlete.name) return athleteId.toString();

  return athlete.name;
}