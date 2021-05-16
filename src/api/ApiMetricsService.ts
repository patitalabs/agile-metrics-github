import { TeamMetricsRequest } from '../Types';
import { Logger } from '../metrics/Logger';
import { GithubModuleFactory } from '../modules/github';
import { GithubMetricItem } from '../modules/github/collector/Types';
import {CoreMetricsClient} from "./CoreMetricsClient";
import {AppConfig} from "../config/AppConfig";

export class ApiMetricsService {
  public static async metricsForRequest(
    teamMetricsRequest: TeamMetricsRequest
  ): Promise<void> {
    try {
      Logger.info(`teamMetricsRequest: ${JSON.stringify(teamMetricsRequest)}`);
      const configurationDescriptors = ApiMetricsService.createConfigurationDescriptorsForRequest(
        teamMetricsRequest
      );
      Logger.info(
        `created configurations: ${JSON.stringify(configurationDescriptors)}`
      );
      const coreMetricsClient = new CoreMetricsClient({host:AppConfig.coreMetricsUrl()});
      for (const configurationDescriptor of configurationDescriptors) {
        const githubMetricItems = await this.collectMetrics(configurationDescriptor);
        await coreMetricsClient.publish(githubMetricItems, configurationDescriptor.shouldUpdateEntries)
      }
      Logger.info('Done!');
    } catch (error) {
      Logger.error(error);
    }
  }

  static createConfigurationDescriptorsForRequest(
    teamMetricsRequest: TeamMetricsRequest
  ): any[] {
    if (teamMetricsRequest.config) {
      return [{ ...teamMetricsRequest }];
    }

    throw Error(
      `Unable to create configuration for request ${JSON.stringify(
        teamMetricsRequest
      )}`
    );
  }

  private static async collectMetrics(
    config: any
  ): Promise<GithubMetricItem[]> {
    return GithubModuleFactory.collectorInstance().fetch(
      GithubModuleFactory.collectorConfiguration(config)
    );
  }
}
