import * as Promise from 'bluebird';
import { Observable, from, of } from 'rxjs';
import { Example } from '../models';
import { inject, injectable } from 'inversify';

import SERVICE_IDENTIFIER from '../../common/constants/identifiers';
import ILogger from '../../common/interfaces/ilogger';
import IExample from '../interfaces/iexample';

const rp: any = require('request-promise');

let id = 0;

const examples: Example[] = [
  { id: id++, name: 'example 0' },
  { id: id++, name: 'example 1' }
];

/**
 * Examples Service Implementation
 */
@injectable()
class ExamplesService implements IExample {
  public logService: ILogger;

  public constructor(@inject(SERVICE_IDENTIFIER.LOGGER) logger: ILogger) {
    this.logService = logger;
  }

  public all(): Promise<Example[]> {
    return Promise.resolve(examples);
  }

  public byId(exampleId: number): Promise<Example> {
    return this.all().then(r => r[exampleId]);
  }

  public byPostsByID(exampleId: number): Observable<any> {
    // Request perfroamcne interceptor
    const includeHeaders = (body, response, resolveWithFullResponse) => {
      return { timings: response.timings, data: body };
    };

    const urlOptions = {
      method: 'GET',
      uri: `${process.env.JSON_PLACEHOLDER_BASE_URL}/posts/` + exampleId,
      resolveWithFullResponse: true,
      json: true,
      time: true,
      timeout: process.env.API_TIME_OUT,
      transform: includeHeaders
    };
    const api = { uri: urlOptions.uri, method: urlOptions.method };
    this.logService.info(api);
    return from(rp(urlOptions));
  }

  public create(name: string): Promise<Example> {
    const example: Example = {
      id: id++,
      name
    };
    examples.push(example);

    return Promise.resolve(example);
  }

  public sampleAPI(): Observable<Example[]> {
    return of(examples);
  }
}

export default ExamplesService;
