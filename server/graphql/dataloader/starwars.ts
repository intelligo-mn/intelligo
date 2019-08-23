import * as fetch from 'node-fetch';
import { IOCContainer } from '../../common/config/ioc_config';
import SERVICE_IDENTIFIER from '../../common/constants/identifiers';
import { timeout } from 'rxjs/operators';
import IStarwars from '../../api/interfaces/istarwars';

const container = IOCContainer.getInstance().getContainer();
const StarwarsService = container.get<IStarwars>(SERVICE_IDENTIFIER.STARWARS);

/**
 * Data Loader function for fetching People with planet information
 * @param id people id
 */
export const fetchPeopleWithPlanet = id => {
  return new Promise((resolve, reject) => {
    StarwarsService.getPeopleById(id)
      .pipe(timeout(+process.env.API_TIME_OUT))
      .subscribe(
        (r: any) => {
          resolve(r);
        },
        error => {
          reject(error);
        }
      );
  });
};

/**
 * Data Loader function for fetching People
 * @param id people id
 */
export const fetchPeople = id => {
  const URI = `${process.env.SWAPI_BASE_URL}/people/` + id;
  return fetch(URI).then(res => res.json());
};

/**
 * Data Loader function for fetching Planet
 * @param id planet id
 */
export const fetchPlanet = id => {
  const URI = `${process.env.SWAPI_BASE_URL}/planets/` + id;
  return fetch(URI).then(res => res.json());
};

/**
 * Data Loader function for fetching Starship
 * @param id starship id
 */
export const fetchStarship = id => {
  const URI = `${process.env.SWAPI_BASE_URL}/starships/` + id;
  return fetch(URI).then(res => res.json());
};
