import { Observable, AsyncSubject, from, forkJoin } from 'rxjs';
import { Planet, People } from '../models';
import { inject, injectable } from 'inversify';
import SERVICE_IDENTIFIER from '../../common/constants/identifiers';
import ILogger from '../../common/interfaces/ilogger';
import IStarwars from '../interfaces/istarwars';

const rp: any = require('request-promise');

/**
 * Starwars Service Implementation
 */
@injectable()
class StarwarsService implements IStarwars {
  public loggerService: ILogger;
  public constructor(
    @inject(SERVICE_IDENTIFIER.LOGGER) loggerService: ILogger
  ) {
    this.loggerService = loggerService;
  }

  public getPeopleById(id: number): Observable<People> {
    const loadedCharacter: AsyncSubject<People> = new AsyncSubject<People>();
    const url1Options = {
      method: 'GET',
      uri: `${process.env.SWAPI_BASE_URL}/people/` + id,
      resolveWithFullResponse: true,
      json: true,
      time: true,
      timeout: process.env.API_TIME_OUT
    };
    const url2Options = {
      method: 'GET',
      uri: `${process.env.SWAPI_BASE_URL}/planets/` + id,
      resolveWithFullResponse: true,
      json: true,
      time: true,
      timeout: process.env.API_TIME_OUT
    };
    const character: Observable<any> = from(rp(url1Options));
    const characterHomeworld: Observable<any> = from(rp(url2Options));

    forkJoin([character, characterHomeworld]).subscribe(
      results => {
        this.loggerService.info(url1Options.uri, results[0].timings);
        this.loggerService.info(url2Options.uri, results[1].timings);
        const result0: People = results[0].body;
        const result1: Planet = results[1].body;
        result0.homeworld = result1;
        loadedCharacter.next(result0);
        loadedCharacter.complete();
      },
      error => {
        this.loggerService.info(url1Options.uri, error);
        this.loggerService.info(url2Options.uri, error);
        loadedCharacter.next(undefined);
        loadedCharacter.complete();
      }
    );

    return loadedCharacter;
  }
}

export default StarwarsService;
