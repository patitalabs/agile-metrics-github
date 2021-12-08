import {
  ScmCollectorConfig,
  ScmMetricItem,
} from './source-control-management/Types';

export interface TeamMetricsRequest {
  shouldUpdateEntries: boolean;
  config: any;
}

export interface CoreMetricsService {
  publish(entries: any, shouldReplaceEntries: boolean);
}

export interface ScmCollectorService {
  fetch(scmCollectorConfig: ScmCollectorConfig): Promise<ScmMetricItem[]>;
}
