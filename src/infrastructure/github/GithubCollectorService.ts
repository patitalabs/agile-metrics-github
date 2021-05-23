import { GithubMetricConverter } from './GithubMetricConverter';
import { ScmCollectorConfig, ScmMetricItem } from '../../domain/source-control-management/Types';
import { GithubService } from './Types';
import { ScmCollectorService } from '../../domain/Types';

export class GithubCollectorService implements ScmCollectorService {
  constructor(private readonly githubService: GithubService) {}

  public async fetch(
    scmCollectorConfig: ScmCollectorConfig
  ): Promise<ScmMetricItem[]> {
    const commits = await this.githubService.commits(scmCollectorConfig);
    return GithubMetricConverter.toMetricItem(commits, scmCollectorConfig);
  }
}
