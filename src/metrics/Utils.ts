export class Utils {
  static daysBetween(date1: Date, date2: Date): number {
    const oneDayInMillis = 1000 * 60 * 60 * 24;

    const differenceInMillis = Math.abs(date2.getTime() - date1.getTime());

    return Math.round(differenceInMillis / oneDayInMillis);
  }

  static checkEnvVar(...theVariables: string[]): void {
    theVariables.forEach((theVariable) => {
      if (!process.env[theVariable]) {
        throw Error(`env.${theVariable} not set!`);
      }
    });
  }
}
