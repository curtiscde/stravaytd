export function isAthleteAllowed(allowedAthletes: string, athleteId: number): boolean {
  return allowedAthletes
    .split(',')
    .map((athlete: string) => Number(athlete.split(':')[0]))
    .includes(athleteId);
}
