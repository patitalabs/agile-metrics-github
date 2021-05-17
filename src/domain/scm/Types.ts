export interface ScmMetricItem {
  sha: string;
  linesAdded: number;
  linesRemoved: number;
  author: string;
  repositoryName: string;
  pullRequest?: {
    prId: number;
    numberOfDaysOpen: number;
    numberOfComments: number;
  };
}

export class ScmCollectorConfig {
  teamName: string;
  repositoryName: string;
  orgName: string;
  since: string;
  until?: string;

  constructor({ repositoryName, orgName, since, until = undefined, teamName }) {
    this.repositoryName = repositoryName;
    this.orgName = orgName;
    this.since = since;
    this.until = until;
    this.teamName = teamName;
  }
}
