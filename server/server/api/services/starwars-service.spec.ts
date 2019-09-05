import { IOCContainer } from '../../common/config/ioc_config';
import SERVICE_IDENTIFIER from '../../common/constants/identifiers';
import '../../common/env';
import { People } from '../models';
import IStarwars from '../interfaces/istarwars';

describe('Starwars Service Tests', () => {
  let starWarsService: IStarwars;
  const testTimeOut = +process.env.TEST_TIME_OUT;
  beforeAll(() => {
    const container = IOCContainer.getInstance().getContainer();
    starWarsService = container.get<IStarwars>(SERVICE_IDENTIFIER.STARWARS);
  });

  it(
    'can get person of id 1 with homeworld as Tatooine ',
    done => {
      starWarsService.getPeopleById(1).subscribe(
        (results: People) => {
          expect(results.name).toEqual('Luke Skywalker');
          expect(results.homeworld.name).toEqual('Tatooine');
          done();
        },
        error => {
          fail(error);
          done();
        }
      );
    },
    testTimeOut
  );
});
