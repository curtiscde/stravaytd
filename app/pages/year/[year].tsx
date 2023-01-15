/* eslint-disable  jsx-a11y/anchor-has-content */
import fs from 'fs';
import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { getStats } from '../../util/getStats';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { getYears } from '../../util/getYears';
import { Section } from '../../types/Section';
import { Sections } from '../../components/Sections';

interface HomeProps {
  distanceData: any;
  runsData: any;
  movingTimeData: any;
  elevationGainData: any;
  year: number;
}

// eslint-disable-next-line react/function-component-definition
const Home: NextPage<HomeProps> = ({
  distanceData, runsData, movingTimeData, elevationGainData, year,
}: HomeProps) => {
  const sections: Section[] = [
    {
      anchor: 'distance',
      title: '🏃‍♂️ Total Distance',
      subtitle: `Total distance since the start of ${year}`,
      data: distanceData,
      formatType: 'km',
    },
    {
      anchor: 'runs',
      title: '💯 Total Runs',
      subtitle: `Total runs since the start of ${year}`,
      data: runsData,
      formatType: 'runs',
    },
    {
      anchor: 'time',
      title: '⏱ Total Moving Time',
      subtitle: `Total moving time since the start of ${year}`,
      data: movingTimeData,
      formatType: 'time',
    },
    {
      anchor: 'elevation',
      title: '🏔 Total Elevation Gain',
      subtitle: `Total elevation gain since the start of ${year}`,
      data: elevationGainData,
      formatType: 'm',
    },
  ];

  return (
    <>
      <Head>
        <title>
          Strava Year-To-Date Stats
          {' '}
          {year}
        </title>
        <meta name="description" content={`Strava Year-To-Date Stats ${year}`} />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏃‍♂️</text></svg>" />
      </Head>
      <Header />
      <Sections sections={sections} />
      <Footer />
    </>
  );
};

export default Home;

export async function getStaticPaths() {
  const ytdHistoryFile = fs.readFileSync('../app/data/ytdHistory.json', 'utf-8');
  const { athletes }: any = JSON.parse(ytdHistoryFile);
  const years = getYears({ athletes });

  const paths = years.map((year) => ({
    params: {
      year: year.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

interface IGetStaticProps {
  params: {
    year: string;
  }
}

export async function getStaticProps({ params: { year } }: IGetStaticProps) {
  const allowedAthletes = process.env.ALLOWED_ATHLETES || '';
  const {
    distanceData, runsData, movingTimeData, elevationGainData,
  } = getStats({ allowedAthletes, year: Number(year) });
  return {
    props: {
      distanceData,
      runsData,
      movingTimeData,
      elevationGainData,
      year,
    },
  };
}
