import React from 'react';
import { render } from '@testing-library/react';
import Home, { getStaticProps } from '../../pages/index';

const distanceData = 1;
const runsData = 2;
const movingTimeData = 3;
const elevationGainData = 4;
const year = 2023;

jest.mock('../../util/getStats', () => ({
  getStats: () => ({
    distanceData,
    runsData,
    movingTimeData,
    elevationGainData,
  }),
}));

// eslint-disable-next-line react/function-component-definition
jest.mock('../../components/YtdChart', () => () => <div>ytdchart</div>);

describe('Home', () => {
  let container: any;

  const mockData = {
    datasets: [
      {
        label: 'foo',
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        data: [
          { x: 1646729876254, y: 1 },
          { x: 1646729876255, y: 2 },
          { x: 1646729876256, y: 3 },
        ],
      },
      {
        label: 'bar',
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        data: [
          { x: 1646729876254, y: 2 },
          { x: 1646729876255, y: 4 },
          { x: 1646729876256, y: 6 },
        ],
      },
    ],
  };

  beforeAll(() => {
    container = render(
      <Home
        distanceData={mockData}
        movingTimeData={mockData}
        runsData={mockData}
        elevationGainData={mockData}
        year={year}
      />,
    ).container;
  });

  it('renders index page', () => {
    expect(container).toMatchSnapshot();
  });
});

describe('getStaticProps', () => {
  it('returns props', async () => {
    expect(await getStaticProps()).toEqual({
      props: {
        distanceData,
        runsData,
        movingTimeData,
        elevationGainData,
        year,
      },
    });
  });
});
