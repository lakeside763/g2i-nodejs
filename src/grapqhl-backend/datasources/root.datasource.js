const { DataSource } = require('apollo-datasource');
const { InMemoryLRUCache } = require('apollo-server-caching');
const config = require('../config');

class RootDataSource extends DataSource {
  constructor() {
    super();
    this.config = config;
  }

  initialize({ context, cache } = {}) {
    this.context = context;
    this.cache = cache || new InMemoryLRUCache();
  }

  didEcounterError(error) {
    throw error;
  }

  cacheKey(id) {
    return `g2i-${process.env.NODE_ENV}-${id}`;
  }
}

module.exports = RootDataSource;
