import { GithubMetricConverter } from './GithubMetricConverter';
import { GithubCollectorConfig, GithubMetricItem } from './Types';
import { GithubService } from '../Types';

export class GithubCollectorService {
  constructor(private readonly githubService: GithubService) {}

  public async fetch(
    githubCollectorConfig: GithubCollectorConfig
  ): Promise<GithubMetricItem[]> {
    const commits = await this.githubService.commits(githubCollectorConfig);
    return GithubMetricConverter.toMetricItem(commits, githubCollectorConfig);
  }
}
