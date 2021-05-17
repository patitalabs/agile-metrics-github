function checkEnvVar(...theVariables: string[]): void {
  theVariables.forEach((theVariable) => {
    if (!process.env[theVariable]) {
      throw Error(`env.${theVariable} not set!`);
    }
  });
}

export class AppConfig {
  static port(): number {
    return (process.env.PORT as number) || 3000;
  }

  static isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }

  static githubToken(): string {
    checkEnvVar('GITHUB_TOKEN');
    return process.env.GITHUB_TOKEN;
  }

  static coreMetricsUrl(): string {
    checkEnvVar('CORE_METRICS_URL');
    return process.env.CORE_METRICS_URL;
  }
}
