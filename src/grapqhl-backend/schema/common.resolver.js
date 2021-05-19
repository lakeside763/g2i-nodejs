const { GraphQLScalarType } = require('graphql');
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json');
const { Kind } = require('graphql/language');

const Sugar = require('sugar-date');

module.exports = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return Sugar.Date.create(value, { setUTC: true });
    },
    serialize(value) {
      return Sugar.Date.create(value, { setUTC: true });
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.STRING) {
        return Sugar.Date.create(ast.value, { setUTC: true });
      }
      return null;
    },
  }),
  JSON: GraphQLJSON,
  JSONObject: GraphQLJSONObject,
};
