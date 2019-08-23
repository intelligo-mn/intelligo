import { gql } from 'apollo-server-express';
import {
  PubSub,
  addMockFunctionsToSchema,
  makeExecutableSchema
} from 'apollo-server';
import { importSchema } from 'graphql-import';
import { GraphQLSchema } from 'graphql/type/schema';
import { merge } from 'lodash';
import AuthDirective from './directives/authDirective';
import FormattableDateDirective from './directives/formattableDate';
import mocks from './mocks';
import {
  BlogResolver,
  ExampleResolver,
  MovieResolver,
  StarwarsResolver,
  UserResolver
} from './resolvers';

export const pubsub = new PubSub();

const typeDefs = gql(importSchema('server/graphql/schema/main.graphql'));

// Merge all the resolvers
const resolvers = merge(
  ExampleResolver,
  StarwarsResolver,
  UserResolver,
  MovieResolver,
  BlogResolver
);

const schemaDirectives = {
  date: FormattableDateDirective,
  auth: AuthDirective
};

export { mocks, schemaDirectives, resolvers, typeDefs };

// Create GraphQL Schema with all the pieces in place
export const setupSchema = (): GraphQLSchema => {
  const myTypeDefs = importSchema('server/graphql/schema/main.graphql');
  const schema = makeExecutableSchema({
    typeDefs: myTypeDefs,
    resolvers: resolvers,
    schemaDirectives: {
      date: FormattableDateDirective,
      auth: AuthDirective
    }
  });

  if (
    process.env.GRAPHQL_MOCK !== undefined &&
    process.env.GRAPHQL_MOCK === 'true'
  ) {
    // Add mocks, modifies schema in place
    // Preserve resolvers that are implemented
    addMockFunctionsToSchema({
      schema,
      mocks: mocks,
      preserveResolvers: true
    });
  }
  return schema;
};
