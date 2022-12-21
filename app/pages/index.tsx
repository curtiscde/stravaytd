/* eslint-disable  jsx-a11y/anchor-has-content */
import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Heading from '../components/Heading';
import YtdChart from '../components/YtdChart';
import { getStats } from '../util/getStats';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { formatTooltip } from '../util/formatTooltip';
import { FormatType } from '../types/FormatType';

interface Section {
  anchor: string;
  title: string;
  subtitle: string;
  data: any;
  formatType: FormatType;
}

interface SectionsProps {
  sections: Array<Section>;
}

function Sections({ sections }: SectionsProps) {
  return (
    <>
      {sections.map(({
        anchor, title, subtitle, data, formatType,
      }) => (
        <div key={anchor}>
          <a id={anchor} />
          <Heading
            title={title}
            subtitle={subtitle}
          />
          <YtdChart
            data={data}
            formatTooltip={(y: any) => formatTooltip(y, formatType)}
          />
        </div>
      ))}
    </>
  );
}

interface HomeProps {
  distanceData: any;
  runsData: any;
  movingTimeData: any;
  elevationGainData: any;
}

// eslint-disable-next-line react/function-component-definition
const Home: NextPage<HomeProps> = ({
  distanceData, runsData, movingTimeData, elevationGainData,
}: HomeProps) => {
  const sections: Section[] = [
    {
      anchor: 'distance',
      title: '🏃‍♂️ Total Distance',
      subtitle: 'Total distance since the start of 2022',
      data: distanceData,
      formatType: 'km',
    },
    {
      anchor: 'runs',
      title: '💯 Total Runs',
      subtitle: 'Total runs since the start of 2022',
      data: runsData,
      formatType: 'runs',
    },
    {
      anchor: 'time',
      title: '⏱ Total Moving Time',
      subtitle: 'Total moving time since the start of 2022',
      data: movingTimeData,
      formatType: 'time',
    },
    {
      anchor: 'elevation',
      title: '🏔 Total Elevation Gain',
      subtitle: 'Total elevation gain since the start of 2022',
      data: elevationGainData,
      formatType: 'm',
    },
  ];

  return (
    <>
      <Head>
        <title>Strava Year-To-Date Stats 2022</title>
        <meta name="description" content="Strava Year-To-Date Stats 2022" />
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
  const {
    distanceData, runsData, movingTimeData, elevationGainData,
  } = getStats({ allowedAthletes });
  return {
    props: {
      distanceData,
      runsData,
      movingTimeData,
      elevationGainData,
    },
  };
}
