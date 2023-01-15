import { FormatType } from './FormatType';

export interface Section {
  anchor: string;
  title: string;
  subtitle: string;
  data: any;
  formatType: FormatType;
}
