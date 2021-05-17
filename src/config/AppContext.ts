import { CoreMetricsClientImpl } from '../infrastructure/core-metrics/CoreMetricsClientImpl';
import { AppConfig } from './AppConfig';
import { GithubCollectorService } from '../infrastructure/github/GithubCollectorService';
import { GithubService } from '../infrastructure/github/Types';
import { GithubClientImpl } from '../infrastructure/github/GithubClientImpl';
import { GithubRepositoryImpl } from '../infrastructure/github/GithubRepositoryImpl';
import { GithubServiceImpl } from '../infrastructure/github/GithubServiceImpl';
import { CoreMetricsService, ScmCollectorService } from '../domain/Types';
import { ApiMetricsService } from '../domain/scm/ApiMetricsService';

function coreMetricsService(): CoreMetricsService {
  return new CoreMetricsClientImpl({
    host: AppConfig.coreMetricsUrl(),
  });
}

function githubService(): GithubService {
  const githubClient = new GithubClientImpl({
    token: `${AppConfig.githubToken()}`,
  });
  const githubRepository = new GithubRepositoryImpl(githubClient);
  return new GithubServiceImpl(githubRepository);
}

function scmCollectorService(): ScmCollectorService {
  return new GithubCollectorService(githubService());
}

function apiMetricsServiceInstance(): ApiMetricsService {
  return new ApiMetricsService(coreMetricsService(), scmCollectorService());
}

export const appContext = Object.freeze({
  apiMetricsService: apiMetricsServiceInstance(),
});
