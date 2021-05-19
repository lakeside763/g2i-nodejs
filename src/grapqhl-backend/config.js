module.exports = {
  port: process.env.PORT || 4000,
  ttlInSeconds: process.env.CACHE_TTL || 0,
  apollo: {
    apikey: process.env.APOLLO_KEY,
    variant: process.env.APOLLO_GRAPH_VARIANT,
    tracing: /^true$/i.test(process.env.ENABLE_GRAPHQL_TRACING),
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASS,
    db: process.env.REDIS_DB,
  },
};
