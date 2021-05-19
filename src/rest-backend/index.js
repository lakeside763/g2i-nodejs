const { app, config: { port }, shutdown } = require('./server');

const server = app.listen(port, console.log(`Server ready at http://localhost:${port}`));

process.on('SIGINT', async () => {
  await shutdown(server);
});

process.on('SIGTERM', async () => {
  console.log('signterm shutdown');
  await shutdown(server);
});
