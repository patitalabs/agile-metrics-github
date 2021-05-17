import {
  GithubClient,
  GithubCommit,
  GithubConfig,
  GithubRepository,
  PullRequestStats,
} from './Types';
import { Converters } from './Converters';

export class GithubRepositoryImpl implements GithubRepository {
  constructor(private readonly githubClient: GithubClient) {}

  async commits(githubConfig: GithubConfig): Promise<GithubCommit[]> {
    const { repositoryName, orgName } = githubConfig;

    const commitsSha: string[] = await this.githubClient.commits(githubConfig);
    const commitsWithDetailsPromise: Promise<GithubCommit>[] = commitsSha.map(
      (commitSha) => this.getCommitDetails(repositoryName, orgName, commitSha)
    );
    return Promise.all(commitsWithDetailsPromise);
  }

  private async getCommitDetails(
    repositoryName: string,
    orgName: string,
    sha: string
  ): Promise<GithubCommit> {
    const commitDetailsResponse = await this.githubClient.getCommitDetails(
      repositoryName,
      orgName,
      sha
    );

    const commitPrResponse = await this.githubClient.pullRequestForCommit(sha);

    let pullRequestStats: PullRequestStats = null;
    const hasAssociatedPullRequest =
      commitPrResponse && commitPrResponse.total_count > 0;
    if (hasAssociatedPullRequest) {
      const linkedPr = commitPrResponse.items[0];

      const prCommentsResponse = await this.githubClient.pullRequestComments({
        owner: orgName,
        repo: repositoryName,
        number: linkedPr.number,
      });

      pullRequestStats = Converters.pullRequestStats(
        commitPrResponse,
        prCommentsResponse
      );
    }
    return Converters.toGithubCommit(commitDetailsResponse, pullRequestStats);
  }
}
