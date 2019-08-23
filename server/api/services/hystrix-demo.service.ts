// tslint:disable:no-console
import * as Promise from 'bluebird';
import { Observable, AsyncSubject, of } from 'rxjs';
import { Post } from '../models';
import { inject, injectable } from 'inversify';
import * as Brakes from 'brakes';
import SERVICE_IDENTIFIER from '../../common/constants/identifiers';

import ILogger from '../../common/interfaces/ilogger';
import IHystrixDemo from '../interfaces/ihystrix-demo';

const timer = 100;
let successRate = 1;
let iterations = 0;

const rp: any = require('request-promise');

let id = 0;

const posts: Post[] = [
  {
    userId: id++,
    id: id,
    title: 'sample post #' + id,
    body: 'sample body #' + id
  },
  {
    userId: id++,
    id: id,
    title: 'sample post #' + id,
    body: 'sample body #' + id
  },
  {
    userId: id++,
    id: id,
    title: 'sample post #' + id,
    body: 'sample body #' + id
  },
  {
    userId: id++,
    id: id,
    title: 'sample post #' + id,
    body: 'sample body #' + id
  },
  {
    userId: id++,
    id: id,
    title: 'sample post #' + id,
    body: 'sample body #' + id
  }
];

/**
 * Hystrix Demo Service Implementation
 */
@injectable()
class HystrixDemoService implements IHystrixDemo {
  public loggerService: ILogger;
  public constructor(
    @inject(SERVICE_IDENTIFIER.LOGGER) loggerService: ILogger
  ) {
    this.loggerService = loggerService;
  }

  public getPosts(timeOut: number): Observable<any> {
    let brakeTimeOut = 2000;
    if (timeOut !== undefined) {
      brakeTimeOut = timeOut;
    }
    console.log('Break Time out = ' + brakeTimeOut);
    const loadedPosts: AsyncSubject<any> = new AsyncSubject<any>();
    const brake = new Brakes(this.getPostsAPI, {
      name: 'Get Posts',
      statInterval: 10000,
      threshold: 0.5,
      circuitDuration: 15000,
      timeout: brakeTimeOut
    });
    brake.fallback(this.getPostsFallback);
    brake
      .exec('Posts Demo')
      .then(data => {
        // console.log(data);
        loadedPosts.next(data);
        loadedPosts.complete();
        console.log('Successful');
      })
      .catch(err => {
        console.log('Failure', err || '');
      });
    return loadedPosts;
  }

  public start(): Observable<boolean> {
    const brake = new Brakes(this.unreliableServiceCall, {
      name: 'Demo API',
      statInterval: 2500,
      threshold: 0.5,
      circuitDuration: 15000,
      timeout: 250
    });

    brake.on('snapshot', snapshot => {
      console.log(
        'Running at:',
        snapshot.stats.successful / snapshot.stats.total
      );
      //   console.log(snapshot);
    });

    brake.on('circuitOpen', () => {
      console.log('----------Circuit Opened--------------');
    });

    brake.on('circuitClosed', () => {
      console.log('----------Circuit Closed--------------');
    });

    brake.fallback(this.fallbackCall);

    setInterval(() => {
      brake
        .exec('Hysteria Demo')
        .then(() => {
          console.log('Successful');
        })
        .catch(err => {
          console.log('Failure', err || '');
        });
    }, 100);

    return of(true);
  }

  private fallbackCall(foo) {
    return new Promise((resolve, reject) => {
      resolve('I always succeed');
    });
  }

  private unreliableServiceCall() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        iterations++;
        if (iterations === 10) {
          successRate = 0.6;
        } else if (iterations === 100) {
          successRate = 0.1;
        } else if (iterations === 200) {
          successRate = 1;
          iterations = 0;
        }
        if (Math.random() <= successRate) {
          resolve();
        } else {
          reject();
        }
      }, timer);
    });
  }

  private getPostsAPI() {
    const postTimeOut = 500;
    const urlOptions = {
      method: 'GET',
      uri: `${process.env.JSON_PLACEHOLDER_BASE_URL}/posts/`,
      resolveWithFullResponse: true,
      json: true,
      time: true,
      timeout: postTimeOut
    };
    return rp(urlOptions);
  }

  private getPostsFallback() {
    return Promise.resolve(posts);
  }
}
export default HystrixDemoService;
