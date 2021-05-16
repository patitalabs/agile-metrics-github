import { GithubCollectorConfig } from './collector/Types';
import { GithubService } from './Types';
import { GithubClientImpl } from './GithubClientImpl';
import { GithubServiceImpl } from './GithubServiceImpl';
import { GithubCollectorService } from './collector/GithubCollectorService';
import { GithubRepositoryImpl } from './GithubRepositoryImpl';
import { AppConfig } from '../../config/AppConfig';

export class GithubModuleFactory {
  private static githubService(): GithubService {
    const githubClient = new GithubClientImpl({
      token: `${AppConfig.githubToken()}`,
    });
    const githubRepository = new GithubRepositoryImpl(githubClient);
    return new GithubServiceImpl(githubRepository);
  }

  static collectorInstance(): GithubCollectorService {
    return new GithubCollectorService(GithubModuleFactory.githubService());
  }

  static collectorConfiguration(obj: any): GithubCollectorConfig {
    return new GithubCollectorConfig({
      repositoryName: obj.repositoryName,
      orgName: obj.orgName,
      since: obj.since,
      until: obj.until,
      teamName: obj.teamName,
    });
  }
}
