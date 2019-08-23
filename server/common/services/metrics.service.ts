import { Request, Response } from 'express';
import { injectable } from 'inversify';
import IMetrics from '../interfaces/imetrics';

const Prometheus = require('prom-client');

const httpRequestDurationMicroseconds = new Prometheus.Summary({
  name: 'http_request_duration_ms',
  help: 'Duration of HTTP requests in ms',
  labelNames: ['route', 'statusCode'],
  // buckets for response time from 0.1ms to 500ms
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500]
});

/**
 * Prometheus Logging Service
 */
@injectable()
class MetricsService implements IMetrics {
  public logAPIMetrics(req: Request, res: Response, statusCode: number) {
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const responseTime = res.getHeader('x-response-time');
    // If the x-response-time is present
    // Add that the metrics being logged for the URL
    if (responseTime) {
      httpRequestDurationMicroseconds
        .labels(fullUrl, statusCode)
        .observe(Number(responseTime));
    } else {
      httpRequestDurationMicroseconds.labels(fullUrl, statusCode);
    }
  }
}

export default MetricsService;
