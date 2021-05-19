const path = require('path');
const { fileLoader, mergeTypes, mergeResolvers } = require('merge-graphql-schemas');

const typesArray = fileLoader(path.join(__dirname, './**/*.graphql'));
const typeDefs = mergeTypes(typesArray, { all: true });

const resolversArray = fileLoader(path.join(__dirname, './**/*.resolver.js'));
const resolvers = mergeResolvers(resolversArray);

module.exports = {
  typeDefs,
  resolvers,
};
