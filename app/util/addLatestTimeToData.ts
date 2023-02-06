import { Data, SectionData } from '../types/SectionData';

interface AddLatestTimeToData {
  sectionData: SectionData
  timestamp: number
}

const filterDataSet = (data: Data[]) => data.filter((d, i) => {
  const previousD = data[i - 1];
  const nextD = data[i + 1];

  if (!previousD || !nextD) return true;

  return !(previousD.y === d.y
      && nextD.y === d.y);
});

export const addLatestTimeToData = ({
  sectionData, timestamp,
}: AddLatestTimeToData): SectionData => ({
  ...sectionData,
  datasets: sectionData.datasets.map((dataset) => {
    const lastData = dataset.data[dataset.data.length - 1];
    let newDataset = [...dataset.data];
    if (new Date(lastData.x).getFullYear() === new Date(timestamp).getFullYear()) {
      newDataset = newDataset.concat([{
        x: timestamp,
        y: lastData.y,
      }]);
    }
    newDataset = filterDataSet(newDataset);
    return {
      ...dataset,
      data: newDataset,
    };
  }),
});
