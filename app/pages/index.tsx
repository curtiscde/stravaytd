import type { NextPage } from 'next'
import Head from 'next/head'
import ytdHistory from '../data/ytdHistory.json';
import Heading from '../components/Heading';
import YtdChart from '../components/YtdChart';
import Link from 'next/link'

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

const Home: NextPage = () => {
  const distanceData = {
    datasets: ytdHistory.athletes.map((athlete, index) => ({
      label: athlete.athleteId,
      ...getStyles(index),
      data: athlete.ytd.map(data => ({
        x: data.date, y: convertMtoKm(data.distance)
      }))
    }))
  }

  const runsData = {
    datasets: ytdHistory.athletes.map((athlete, index) => ({
      label: athlete.athleteId,
      ...getStyles(index),
      data: athlete.ytd.map(data => ({
        x: data.date, y: data.count
      }))
    }))
  }

  const movingTimeData = {
    datasets: ytdHistory.athletes.map((athlete, index) => ({
      label: athlete.athleteId,
      ...getStyles(index),
      data: athlete.ytd.map(data => ({
        x: data.date, y: (data.movingTime / 60)
      }))
    }))
  }

  const elevationGainData = {
    datasets: ytdHistory.athletes.map((athlete, index) => ({
      label: athlete.athleteId,
      ...getStyles(index),
      data: athlete.ytd.map(data => ({
        x: data.date, y: data.elevationGain
      }))
    }))
  }

  return (
    <>
      <Head>
        <title>Strava Year To Date Stats 2022</title>
        <meta name="description" content="Strava Year To Date Stats 2022" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏃‍♂️</text></svg>"></link>
      </Head>

      {/* <header className="p-4 dark:bg-coolGray-800 dark:text-coolGray-100">
        <div className="container flex justify-between h-16 mx-auto">
          <a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2">
            🏃‍♂️ Strava Year-To-Date Stats
          </a>
        </div>
      </header> */}

      <header className="container flex items-center justify-between w-full max-w-3xl px-6 py-10 mx-auto xl:max-w-5xl">
        <Link href='/'>
          <a rel="noopener noreferrer" className="block h-6 text-2xl font-semibold">Strava Year-To-Date Stats</a>
        </Link>
        <div className="flex items-center">
          <div className="hidden space-x-2 font-medium sm:block">
            <Link href="#distance"><a rel="noopener noreferrer" className="p-1">🏃‍♂️ Distance</a></Link>
            <Link href="#runs"><a rel="noopener noreferrer" className="p-1">💯 Runs</a></Link>
            <Link href="#time"><a rel="noopener noreferrer" className="p-1">⏱ Time</a></Link>
            <Link href="#elevation"><a rel="noopener noreferrer" className="p-1">🏔 Elevation</a></Link>
          </div>
        </div>
      </header>

      <a id="distance"></a>
      <Heading
        title='🏃‍♂️ Total Distance'
        subtitle='Total distance since the start of 2022'
      />
      <YtdChart data={distanceData} />

      <a id="runs"></a>
      <Heading
        title='💯 Total Runs'
        subtitle='Total runs since the start of 2022'
      />
      <YtdChart data={runsData} />

      <a id="time"></a>
      <Heading
        title='⏱ Total Moving Time'
        subtitle='Total moving time since the start of 2022'
      />
      <YtdChart data={movingTimeData} />

      <a id="elevation"></a>
      <Heading
        title='🏔 Total Elevation Gain'
        subtitle='Total elevation gain since the start of 2022'
      />
      <YtdChart data={elevationGainData} />

    </>
  )
}

export default Home
