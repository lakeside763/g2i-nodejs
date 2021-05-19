/* eslint-disable global-require, no-empty-function */
if (process.env.CI) {
  require('dotenv').config({ path: './.env.test.ci' });
} else {
  require('dotenv').config({ path: './.env.test.local' });
}

module.exports = async function globalSetup() {};
