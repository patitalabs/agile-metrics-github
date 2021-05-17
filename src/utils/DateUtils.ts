export class DateUtils {
  static daysBetween(date1: Date, date2: Date): number {
    const oneDayInMillis = 1000 * 60 * 60 * 24;

    const differenceInMillis = Math.abs(date2.getTime() - date1.getTime());

    return Math.round(differenceInMillis / oneDayInMillis);
  }
}
