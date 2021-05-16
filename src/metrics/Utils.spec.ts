import { Utils } from './Utils';

describe('Utils', () => {
  it('daysBetween', () => {
    const dateOne = new Date('2018-12-03');
    const dateTwo = new Date('2018-12-05');
    const daysBetween = Utils.daysBetween(dateOne, dateTwo);

    expect(daysBetween).toBe(2);
  });
});
