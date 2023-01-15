/* eslint-disable  jsx-a11y/anchor-has-content */
import React from 'react';
import { Section } from '../types/Section';
import { formatTooltip } from '../util/formatTooltip';
import Heading from './Heading';
import YtdChart from './YtdChart';

interface SectionsProps {
  sections: Array<Section>;
}

export function Sections({ sections }: SectionsProps) {
  return (
    <>
      {sections.map(({
        anchor, title, subtitle, data, formatType,
      }) => (
        <div key={anchor}>
          <a id={anchor} />
          <Heading
            title={title}
            subtitle={subtitle}
          />
          <YtdChart
            data={data}
            formatTooltip={(y: any) => formatTooltip(y, formatType)}
          />
        </div>
      ))}
    </>
  );
}
