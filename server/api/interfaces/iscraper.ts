import { Observable } from 'rxjs';
import ScrapeData from './scrape-data';
/**
 * StarWars Service Interface
 */
interface IScraper {
  getAll(): Observable<any>;
  getAllSites(): Observable<any>;
  getScrapedData(url: string,headless: string): Observable<any>;

  getScrapedListData(scrapeInfo: ScrapeData, withURL: boolean): Observable<any>;

  push(name: string, data: object, replace?:boolean): Observable<any>;
  pushProduct(name: string, data: object): Observable<any>;
  pushSite(name: string, data: string): Observable<any>;

  byMicrositeByID(name: string): Observable<any>;
  deleteMicrositeByID(name: string): Observable<any>;
  deleteMicrositePublishByID(name: string): Observable<any>;

  byPublishedMicrositeByID(name: string): Observable<any>;
}

export default IScraper;
