import { formatTooltip } from './formatTooltip';

describe('formatTooltip', () => {
  describe('km', () => {
    it('returns km', () => {
      expect(formatTooltip(5.2, 'km')).toEqual('5.2 km');
    });
  });

  describe('runs', () => {
    it('returns runs', () => {
      expect(formatTooltip(5, 'runs')).toEqual('5 runs');
    });
  });

  describe('time', () => {
    it('returns time', () => {
      expect(formatTooltip(128, 'time')).toEqual('2h 8m');
    });
  });

  describe('m', () => {
    it('returns metres', () => {
      expect(formatTooltip(89, 'm')).toEqual('89 m');
    });
  });
});
