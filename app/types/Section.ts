import { FormatType } from './FormatType';
import { SectionData } from './SectionData';

export interface Section {
  anchor: string;
  title: string;
  subtitle: string;
  data: SectionData;
  formatType: FormatType;
}
