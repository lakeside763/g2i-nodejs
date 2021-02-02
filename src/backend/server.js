const compression = require('compression');
const express  = require('express');

const config = require('./config');
const prisma = require('./database');

const acronymRoutes = require('./api/routes/acronym.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

app.use('/acronym', acronymRoutes);

async function shutdown(serverApp) {
  console.info('Received kill signal, shutting down gracefully'); // eslint-disable-line no-console
  await prisma.$disconnect();
  await serverApp.close();
  return process.exit();
}

module.exports = { app, config, shutdown };

