const { app, config: { port } } = require('./server');

app.listen(port, console.log(`Server ready at http://localhost:${port}`));
