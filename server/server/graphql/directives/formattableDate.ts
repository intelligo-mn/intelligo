import { GraphQLString, defaultFieldResolver } from 'graphql';
import { SchemaDirectiveVisitor } from 'apollo-server';

/**
 * GraphQL Schema directive sample for formatting the date
 */
export default class FormattableDateDirective extends SchemaDirectiveVisitor {
  public visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { defaultFormat } = this.args;

    field.args.push({
      name: 'format',
      type: GraphQLString
    });

    field.resolve = async function(
      source,
      { format, ...otherArgs },
      context,
      info
    ) {
      const date = await resolve.call(this, source, otherArgs, context, info);
      // If a format argument was not provided, default to the optional
      // defaultFormat argument taken by the @date directive:
      return require('dateformat')(date, format || defaultFormat);
    };

    field.type = GraphQLString;
  }
}
