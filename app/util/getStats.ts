import fs from 'fs';
import { mapAthleteName } from './mapAthleteName';

const convertMtoKm = (metres: number) => Math.round((metres / 1000) * 100) / 100

const getStyles = (index: number) => {
  const borderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ];
  const backgroundColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
  ];
  return {
    borderColor: borderColors[index],
    backgroundColor: backgroundColors[index],
  }
}

export function getStats(allowedAthletes: string) {
  const ytdHistoryFile = fs.readFileSync('../app/data/ytdHistory.json', 'utf-8');
  const ytdHistory: any = JSON.parse(ytdHistoryFile);

  const distanceData = {
    datasets: ytdHistory.athletes.map((athlete: any, index: any) => ({
      label: mapAthleteName(allowedAthletes, athlete.athleteId),
      ...getStyles(index),
      data: athlete.ytd.map((data: any) => ({
        x: data.date, y: convertMtoKm(data.distance)
      }))
    }))
  }

  const runsData = {
    datasets: ytdHistory.athletes.map((athlete: any, index: any) => ({
      label: mapAthleteName(allowedAthletes, athlete.athleteId),
      ...getStyles(index),
      data: athlete.ytd.map((data: any) => ({
        x: data.date, y: data.count
      }))
    }))
  }

  const movingTimeData = {
    datasets: ytdHistory.athletes.map((athlete: any, index: any) => ({
      label: mapAthleteName(allowedAthletes, athlete.athleteId),
      ...getStyles(index),
      data: athlete.ytd.map((data: any) => ({
        x: data.date, y: (data.movingTime / 60)
      }))
    }))
  }

  const elevationGainData = {
    datasets: ytdHistory.athletes.map((athlete: any, index: any) => ({
      label: mapAthleteName(allowedAthletes, athlete.athleteId),
      ...getStyles(index),
      data: athlete.ytd.map((data: any) => ({
        x: data.date, y: data.elevationGain
      }))
    }))
  }

  return {
    distanceData,
    runsData,
    movingTimeData,
    elevationGainData,
  }
}