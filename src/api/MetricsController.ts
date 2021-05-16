import { Request, Response } from 'express';
import { ApiMetricsService } from './ApiMetricsService';
import { TeamMetricsRequest } from '../Types';
import { Logger } from '../metrics/Logger';

export class MetricsController {
  static postMetrics = (req: Request, res: Response): void => {
    (async (): Promise<any> => {
      await MetricsController.handleRequest(req, res);
    })();
  };

  static updateMetrics = (req: Request, res: Response): void => {
    (async (): Promise<any> => {
      await MetricsController.handleRequest(req, res);
    })();
  };

  private static async handleRequest(
    req: Request,
    res: Response
  ): Promise<any> {
    try {
      await this.collectMetrics(req);
      res.json({ status: 'Done!.' });
      Logger.info('Done!');
    } catch (error) {
      Logger.error(error);
      res.json({ error: 'Could not process request' });
    }
  }

  private static async collectMetrics(req: Request): Promise<void> {
    const teamMetricRequest = this.createRequest(req);
    return ApiMetricsService.metricsForRequest(teamMetricRequest);
  }

  private static createRequest(req: Request): TeamMetricsRequest {
    const body = req.body;
    const config = body.config || null;
    const method = req.method;

    const shouldUpdateEntries = method === 'PUT';

    return {
      config,
      shouldUpdateEntries,
    };
  }
}
