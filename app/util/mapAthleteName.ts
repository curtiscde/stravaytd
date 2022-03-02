export function mapAthleteName(allowedAthletes: string, athleteId: number): string {
  const athlete = allowedAthletes
    .split(',')
    .map((a: string) => {
      const thisAthlete = a.split(':');
      return { id: Number(thisAthlete[0]), name: thisAthlete[1] };
    })
    .find((a) => a.id === athleteId);

  if (!athlete || !athlete.name) return athleteId.toString();

  return athlete.name;
}
