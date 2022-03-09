import { FormatType } from '../types/FormatType';

const formatter = {
  km: (value: any) => `${value} km`,
  runs: (value: any) => `${value} runs`,
  time: (value: any) => {
    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return `${hours}h ${parseInt(minutes.toString(), 10)}m`;
  },
  m: (value: any) => `${value} m`,
};

export const formatTooltip = (value: any, formatType: FormatType) => formatter[formatType](value);
