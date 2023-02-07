import { SectionData } from '../types/SectionData';
import { addLatestTimeToData } from './addLatestTimeToData';

const convertToTimestamp = (date: string) => new Date(date).getTime();

describe('addLatestTimeToData', () => {
  it('adds latest time to data', () => {
    const sectionData: SectionData = {
      datasets: [{
        label: 'foo',
        borderColor: 'borderColor',
        backgroundColor: 'backgroundColor',
        data: [
          { x: convertToTimestamp('2023-01-01'), y: 1 },
          { x: convertToTimestamp('2023-01-02'), y: 2 },
        ],
      }],
    };

    expect(
      addLatestTimeToData({ sectionData, timestamp: convertToTimestamp('2023-01-03') }),
    ).toEqual({
      datasets: [{
        ...sectionData.datasets[0],
        data: [
          { x: convertToTimestamp('2023-01-01'), y: 1 },
          { x: convertToTimestamp('2023-01-02'), y: 2 },
          { x: convertToTimestamp('2023-01-03'), y: 2 },
        ],
      }],
    });
  });

  it('filters duplicate y values', () => {
    const sectionData: SectionData = {
      datasets: [{
        label: 'foo',
        borderColor: 'borderColor',
        backgroundColor: 'backgroundColor',
        data: [
          { x: convertToTimestamp('2023-01-01'), y: 1 },
          { x: convertToTimestamp('2023-01-02'), y: 2 },
          { x: convertToTimestamp('2023-01-02'), y: 2 },
        ],
      }],
    };

    expect(
      addLatestTimeToData({ sectionData, timestamp: convertToTimestamp('2023-01-04') }),
    ).toEqual({
      datasets: [{
        ...sectionData.datasets[0],
        data: [
          { x: convertToTimestamp('2023-01-01'), y: 1 },
          { x: convertToTimestamp('2023-01-02'), y: 2 },
          { x: convertToTimestamp('2023-01-04'), y: 2 },
        ],
      }],
    });
  });

  it('does not add latest time to data if its a previous year', () => {
    const sectionData: SectionData = {
      datasets: [{
        label: 'foo',
        borderColor: 'borderColor',
        backgroundColor: 'backgroundColor',
        data: [
          { x: convertToTimestamp('2022-01-01'), y: 1 },
          { x: convertToTimestamp('2022-01-02'), y: 2 },
        ],
      }],
    };

    expect(
      addLatestTimeToData({ sectionData, timestamp: convertToTimestamp('2023-01-03') }),
    ).toEqual({
      datasets: [{
        ...sectionData.datasets[0],
        data: [
          { x: convertToTimestamp('2022-01-01'), y: 1 },
          { x: convertToTimestamp('2022-01-02'), y: 2 },
        ],
      }],
    });
  });

  it('does not add latest time to data if the latest data is newer than timestamp provided', () => {
    const sectionData: SectionData = {
      datasets: [{
        label: 'foo',
        borderColor: 'borderColor',
        backgroundColor: 'backgroundColor',
        data: [
          { x: convertToTimestamp('2024-01-01'), y: 1 },
          { x: convertToTimestamp('2024-01-02'), y: 2 },
        ],
      }],
    };

    expect(
      addLatestTimeToData({ sectionData, timestamp: convertToTimestamp('2023-01-03') }),
    ).toEqual({
      datasets: [{
        ...sectionData.datasets[0],
        data: [
          { x: convertToTimestamp('2024-01-01'), y: 1 },
          { x: convertToTimestamp('2024-01-02'), y: 2 },
        ],
      }],
    });
  });
});
