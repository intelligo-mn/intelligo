import { Observable } from 'rxjs';

/**
 * Hystrix Service Interface
 */
interface IHystrixDemo {
  start(): Observable<boolean>;
  getPosts(timeOut: number): Observable<any>;
}

export default IHystrixDemo;
