import type { NextPage } from 'next'
import Head from 'next/head';
import Heading from '../components/Heading';
import YtdChart from '../components/YtdChart';
import { getStats } from '../util/getStats';
import Footer from '../components/Footer';
import Header from '../components/Header';

interface SectionsProps {
  sections: Array<{
    anchor: string;
    title: string;
    subtitle: string;
    data: any;
    formatTooltip?: (y: any) => string;
  }>
}

function Sections({ sections }: SectionsProps) {
  return (<>{sections.map(({ anchor, title, subtitle, data, formatTooltip }) => (
    <div key={anchor}>
      <a id={anchor}></a>
      <Heading
        title={title}
        subtitle={subtitle}
      />
      <YtdChart data={data} formatTooltip={formatTooltip} />
    </div>
  ))}</>)
}

interface HomeProps {
  distanceData: any;
  runsData: any;
  movingTimeData: any;
  elevationGainData: any;
}

const Home: NextPage<HomeProps> = ({ distanceData, runsData, movingTimeData, elevationGainData }: HomeProps) => {
  const sections = [
    {
      anchor: 'distance',
      title: '🏃‍♂️ Total Distance',
      subtitle: 'Total distance since the start of 2022',
      data: distanceData,
      formatTooltip: (y: any) => `${y} km`
    },
    {
      anchor: 'runs',
      title: '💯 Total Runs',
      subtitle: 'Total runs since the start of 2022',
      data: runsData,
      formatTooltip: (y: any) => `${y} runs`
    },
    {
      anchor: 'time',
      title: '⏱ Total Moving Time',
      subtitle: 'Total moving time since the start of 2022',
      data: movingTimeData,
      formatTooltip: (y: any) => {
        const hours = Math.floor(y / 60);
        const minutes = y % 60;
        return `${hours}h ${parseInt(minutes.toString(), 10)}m`
      }
    },
    {
      anchor: 'elevation',
      title: '🏔 Total Elevation Gain',
      subtitle: 'Total elevation gain since the start of 2022',
      data: elevationGainData,
      formatTooltip: (y: any) => `${y} m`
    },
  ]

  return (
    <>
      <Head>
        <title>Strava Year-To-Date Stats 2022</title>
        <meta name="description" content="Strava Year-To-Date Stats 2022" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏃‍♂️</text></svg>"></link>
      </Head>
      <Header />
      <Sections sections={sections} />
      <Footer />
    </>
  )
}

export default Home

export async function getStaticProps() {
  const allowedAthletes = process.env.ALLOWED_ATHLETES || '';
  const { distanceData, runsData, movingTimeData, elevationGainData } = getStats(allowedAthletes);
  return {
    props: {
      distanceData,
      runsData,
      movingTimeData,
      elevationGainData,
    },
  };
}