import fs from 'fs';
import { IYtdHistory } from '../types/IYtdHistory';
import { addFinalDateToYtdHistory } from './addFinalDateToYtdHistory';
import { filterData } from './filterData';
import { generateRealTimeYtd } from './generateRealTimeYtd';
import { getAthletesCurrentYtd } from './getAthletesCurrentYtd';
import { mapAthleteName } from './mapAthleteName';

const convertMtoKm = (metres: number) => Math.round((metres / 1000) * 100) / 100;

const getStyles = (index: number) => {
  const borderColors = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ];
  const backgroundColors = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ];
  return {
    borderColor: borderColors[index],
    backgroundColor: backgroundColors[index],
  };
};

interface GetStats {
  allowedAthletes: string
  year: number
}

export function getStats({ allowedAthletes, year }: GetStats) {
  const ytdHistoryFile = fs.readFileSync('../app/data/ytdHistory.json', 'utf-8');
  const ytd = JSON.parse(ytdHistoryFile) as IYtdHistory;
  const currentYtds = getAthletesCurrentYtd('./data/current-ytd');
  const now = new Date().getTime();
  let realTimeYtd = generateRealTimeYtd({ ytd, currentYtds, now });
  realTimeYtd = addFinalDateToYtdHistory({ ytdHistory: realTimeYtd });

  const { athletes }: any = realTimeYtd;

  const distanceData = {
    datasets: filterData({
      athletes,
      propertyName: 'distance',
      year,
    }).map((athlete: any, index: any) => ({
      label: mapAthleteName(allowedAthletes, athlete.athleteId),
      ...getStyles(index),
      data: athlete.ytd.map((data: any) => ({
        x: data.date, y: convertMtoKm(data.distance),
      })),
    })),
  };

  const runsData = {
    datasets: filterData({
      athletes,
      propertyName: 'distance',
      year,
    }).map((athlete: any, index: any) => ({
      label: mapAthleteName(allowedAthletes, athlete.athleteId),
      ...getStyles(index),
      data: athlete.ytd.map((data: any) => ({
        x: data.date, y: data.count,
      })),
    })),
  };

  const movingTimeData = {
    datasets: filterData({
      athletes,
      propertyName: 'distance',
      year,
    }).map((athlete: any, index: any) => ({
      label: mapAthleteName(allowedAthletes, athlete.athleteId),
      ...getStyles(index),
      data: athlete.ytd.map((data: any) => ({
        x: data.date, y: (data.movingTime / 60),
      })),
    })),
  };

  const elevationGainData = {
    datasets: filterData({
      athletes,
      propertyName: 'distance',
      year,
    }).map((athlete: any, index: any) => ({
      label: mapAthleteName(allowedAthletes, athlete.athleteId),
      ...getStyles(index),
      data: athlete.ytd.map((data: any) => ({
        x: data.date, y: data.elevationGain,
      })),
    })),
  };

  return {
    distanceData,
    runsData,
    movingTimeData,
    elevationGainData,
  };
}
