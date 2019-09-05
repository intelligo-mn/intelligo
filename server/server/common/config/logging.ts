import { Application } from 'express';
import { IOCContainer } from './ioc_config';
import SERVICE_IDENTIFIER from '../constants/identifiers';

import ILogger from '../interfaces/ilogger';
const container = IOCContainer.getInstance().getContainer();
const LOG = container.get<ILogger>(SERVICE_IDENTIFIER.LOGGER);
const UUID = 'UUID';
/**
 * Add Logging configuration to the app server
 * @param app Express applicatton
 */
export const configLogging = (app: Application) => {
  app.use((req: any, res, next) => {
    // If UUID set in the cookie then add to the log for tracking
    if (req.cookies[UUID] !== undefined) {
      LOG.setUUID(req.cookies[UUID]);
    } else {
      // unset previously set value if any
      LOG.setUUID(undefined);
    }
    next();
  });
};

export default LOG;
