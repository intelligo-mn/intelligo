import { IOCContainer } from '../../common/config/ioc_config';
import SERVICE_IDENTIFIER from '../../common/constants/identifiers';
import { getAuthenticatedUser } from '../../common/middleware/auth-middleware';
import { UnAuthorizedError } from '../errors';
import { pubsub } from '../setupSchema';

import IExample from '../../api/interfaces/iexample';

const container = IOCContainer.getInstance().getContainer();
const ExampleService = container.get<IExample>(SERVICE_IDENTIFIER.EXAMPLE);

const EXAMPLE_ADDED = 'EXAMPLE_ADDED';
/**
 * Examples GraphQL resolver
 */
export default {
  Subscription: {
    exampleAdded: {
      subscribe: () => pubsub.asyncIterator(EXAMPLE_ADDED)
    }
  },

  Query: {
    today(parent, args, context, info) {
      return new Date(2000, 11, 12);
    },
    quoteOfTheDay(parent, args, context, info) {
      return Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within';
    },
    random(parent, args, context, info) {
      return Math.random();
    },
    rollThreeDice(parent, args, context, info) {
      return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6));
    },
    example(parent, args, context, info) {
      return ExampleService.byId(args.id);
    },
    examplesWithAuth(parent, args, context, info) {
      // Check if user is authenticated then enable access
      return ExampleService.all();
    },
    examples(parent, args, context, info) {
      // Check if user is authenticated then enable access
      return getAuthenticatedUser(context).then(
        user => {
          return ExampleService.all();
        },
        error => {
          throw new UnAuthorizedError({
            data: {
              error_code: 'AUTH01'
            }
          });
        }
      );
    }
  },
  Mutation: {
    addExample: async (parent, args, context, info) => {
      const exampleAdded = await ExampleService.create(args.name);
      pubsub.publish(EXAMPLE_ADDED, { exampleAdded: exampleAdded });
      return exampleAdded;
    }
  }
};
