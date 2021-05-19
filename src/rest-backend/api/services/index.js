const acronymService = require('./acronym.service');

module.exports = {
  services: {
    acronyms: new acronymService(),
  }
}

