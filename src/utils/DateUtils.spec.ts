import { DateUtils } from './DateUtils';

describe('Utils', () => {
  it('daysBetween', () => {
    const dateOne = new Date('2018-12-03');
    const dateTwo = new Date('2018-12-05');
    const daysBetween = DateUtils.daysBetween(dateOne, dateTwo);

    expect(daysBetween).toBe(2);
  });
});
