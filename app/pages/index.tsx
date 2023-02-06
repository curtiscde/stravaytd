/* eslint-disable  jsx-a11y/anchor-has-content */
import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { getStats } from '../util/getStats';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Section } from '../types/Section';
import { Sections } from '../components/Sections';
import { SectionData } from '../types/SectionData';
import { addLatestTimeToData } from '../util/addLatestTimeToData';

interface HomeProps {
  distanceData: SectionData;
  runsData: SectionData;
  movingTimeData: SectionData;
  elevationGainData: SectionData;
  year: number;
}

// eslint-disable-next-line react/function-component-definition
const Home: NextPage<HomeProps> = ({
  distanceData, runsData, movingTimeData, elevationGainData, year,
}: HomeProps) => {
  const now = new Date().getTime();
  const sections: Section[] = [
    {
      anchor: 'distance',
      title: '🏃‍♂️ Total Distance',
      subtitle: `Total distance since the start of ${year}`,
      data: addLatestTimeToData({ sectionData: distanceData, timestamp: now }),
      formatType: 'km',
    },
    {
      anchor: 'runs',
      title: '💯 Total Runs',
      subtitle: `Total runs since the start of ${year}`,
      data: addLatestTimeToData({ sectionData: runsData, timestamp: now }),
      formatType: 'runs',
    },
    {
      anchor: 'time',
      title: '⏱ Total Moving Time',
      subtitle: `Total moving time since the start of ${year}`,
      data: addLatestTimeToData({ sectionData: movingTimeData, timestamp: now }),
      formatType: 'time',
    },
    {
      anchor: 'elevation',
      title: '🏔 Total Elevation Gain',
      subtitle: `Total elevation gain since the start of ${year}`,
      data: addLatestTimeToData({ sectionData: elevationGainData, timestamp: now }),
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

export async function getStaticProps() {
  const allowedAthletes = process.env.ALLOWED_ATHLETES || '';
  const year = 2023;
  const {
    distanceData, runsData, movingTimeData, elevationGainData,
  } = getStats({ allowedAthletes, year });
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
