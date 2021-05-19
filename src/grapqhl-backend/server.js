const compression = require('compression');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { RedisCache } = require('apollo-server-cache-redis');
const indexRouter = require('./routes/index');
const config = require('./config');
const datasources = require('./datasources');
const prisma = require('./database');

const cache = new RedisCache(config.redis);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

app.use('/', indexRouter);

const { typeDefs, resolvers } = require('./schema');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache,
  dataSources: () => ({
    acronyms: new datasources.Acronyms(),
  }),
  formatError: (err) => {
    if (err.extensions.code !== 'UNAUTHENTICATED' && err.extensions.code !== 'BAD_USER_INPUT') {
      console.error(JSON.stringify(err, null, 2));
    }
    return err;
  },
  context: async () => ({
    prisma,
  }),
});

server.applyMiddleware({ app });

const shutdown = async () => {
  // eslint-disable-next-line no-console
  console.info('Received kill signal, shutting down gracefully');
  await prisma.$disconnect();
  return process.exit();
};

module.exports = {
  app,
  server,
  config,
  shutdown,
};
