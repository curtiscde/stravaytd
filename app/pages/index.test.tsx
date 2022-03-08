import React from 'react';
import { render } from '@testing-library/react';
import Home from '.';

// eslint-disable-next-line react/function-component-definition
jest.mock('../components/YtdChart', () => () => <div>ytdchart</div>);

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

describe('index', () => {
  let container: any;

  beforeAll(() => {
    container = render(
      <Home
        distanceData={mockData}
        movingTimeData={mockData}
        runsData={mockData}
        elevationGainData={mockData}
      />,
    ).container;
  });

  it('renders index page', () => {
    expect(container).toMatchSnapshot();
  });
});
