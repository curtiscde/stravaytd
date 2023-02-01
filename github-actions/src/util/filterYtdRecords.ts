import { IYtd } from '../types/IYtd';

const isDiff = (x: IYtd, y: IYtd) => {
  if (x.count !== y.count) return true;
  if (x.distance !== y.distance) return true;
  if (x.elevationGain !== y.elevationGain) return true;
  if (x.movingTime !== y.movingTime) return true;
  return false;
};

export const filterYtdRecords = ({ ytds }: { ytds: IYtd[] }) => ytds
  .filter((d, i) => {
    const previousD = ytds[i - 1];
    const nextD = ytds[i + 1];

    // return true if there is no previous or next data point
    if (!previousD || !nextD) return true;

    // only return true if the previous and next data points
    // are different to the current value
    return isDiff(d, previousD) || isDiff(d, nextD);
  });
