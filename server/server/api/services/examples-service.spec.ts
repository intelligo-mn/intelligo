import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/operators';
import IExample from '../../api/interfaces/iexample';
import { IOCContainer } from '../../common/config/ioc_config';
import SERVICE_IDENTIFIER from '../../common/constants/identifiers';
import '../../common/env';

describe('Example Service Tests', () => {
  let exampleService: IExample;
  beforeAll(() => {
    const container = IOCContainer.getInstance().getContainer();
    exampleService = container.get<IExample>(SERVICE_IDENTIFIER.EXAMPLE);
  });

  it('Get All elements in the example array', () => {
    return exampleService.all().then(result => {
      expect(result.length).toEqual(2);
    });
  });

  it('should return userId of 1 for byPostsByID call', done => {
    const source = exampleService
      .byPostsByID(1)
      .pipe(catchError(err => of(err)));
    source.subscribe(
      result => {
        if (result.data && result.data.userId) {
          expect(result.data.userId).toEqual(1);
        } else {
          fail('unexpected result' + result);
        }
        done();
      },
      error => {
        fail(error);
      }
    );
  });

  it('POST Test', () => {
    const expectedName = 'Hello World';
    return exampleService.create(expectedName).then(result => {
      expect(result.name).toEqual(expectedName);
      return exampleService
        .byId(2)
        .then(data => expect(data.name).toEqual(expectedName));
    });
  });
});
