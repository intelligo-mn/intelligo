import { Observable } from 'rxjs';
import { People } from '../models';

/**
 * StarWars Service Interface
 */
interface IStarWars {
  getPeopleById(id: number): Observable<People>;
}

export default IStarWars;
