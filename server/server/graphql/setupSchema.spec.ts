// Need to include the next line for Visual Studio Code
// intellisense to work for jest types
import { graphql } from 'graphql';

import '../common/env';
import { fetchPeople } from './dataloader/starwars';
import { setupSchema } from './setupSchema';

const DataLoader = require('dataloader');

describe('Example Service Tests', () => {
  const testTimeOut = +process.env.TEST_TIMEOUT;
  it('should be returning a quote ', done => {
    const query = `
        query Q {
            quoteOfTheDay
        }
      `;
    const rootValue = {};
    graphql(setupSchema(), query, rootValue).then(result => {
      const { data } = result;
      expect(data.quoteOfTheDay).not.toHaveLength(0);
      done();
    });
  });

  it('should be returning a random number > 0 ', done => {
    const query = `
        query Q {
            random
        }
      `;
    const rootValue = {};
    graphql(setupSchema(), query, rootValue).then(result => {
      const { data } = result;
      expect(data.random).toBeGreaterThan(0);
      done();
    });
  });

  it(
    'should be returning a starwars people result for "Luke Skywalker" ',
    done => {
      const query = `
        query Q {
            people(id: 1) {
                name
            }
        }
      `;
      const expectedValue = 'Luke Skywalker';
      const rootValue = {};
      const peopleLoader = new DataLoader(keys =>
        Promise.all(keys.map(fetchPeople))
      );
      const contextValue = {
        peopleLoader
      };
      graphql(setupSchema(), query, rootValue, contextValue).then(
        result => {
          const { people } = result.data;
          expect(people.name).toEqual(expectedValue);
          done();
        },
        error => {
          fail(error);
        }
      );
    },
    testTimeOut
  );
});
