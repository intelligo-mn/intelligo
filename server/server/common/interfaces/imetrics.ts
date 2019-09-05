import { Request, Response } from 'express';

/**
 * Prometheus Metrics Service Interface
 */
interface IMetrics {
  logAPIMetrics(req: Request, res: Response, statusCode: number): void;
}

export default IMetrics;
