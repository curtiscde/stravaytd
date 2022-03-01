import React from 'react';
import { render, screen } from '@testing-library/react';
import Heading from './Heading';

describe('Header', () => {
  beforeEach(() => {
    render(<Heading title="test title" subtitle="test subtitle" />);
  });

  it('displays title', () => {
    expect(screen.getByRole('heading', {
      level: 2,
      name: 'test title',
    })).toBeTruthy();
  });

  it('displays subtitle', () => {
    expect(screen.getByText('test subtitle')).toBeTruthy();
  });
});
