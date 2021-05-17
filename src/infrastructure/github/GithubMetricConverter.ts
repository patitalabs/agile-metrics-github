import { GithubCommit } from './Types';
import { ScmCollectorConfig, ScmMetricItem } from '../../domain/scm/Types';

export class GithubMetricConverter {
  static toMetricItem(
    githubCommits: GithubCommit[],
    scmCollectorConfig: ScmCollectorConfig
  ): ScmMetricItem[] {
    return githubCommits.map((commit) => ({
      id: commit.sha,
      dataType: 'SCM',
      repositoryName: scmCollectorConfig.repositoryName,
      teamName: scmCollectorConfig.teamName,
      ...commit,
    }));
  }
}
