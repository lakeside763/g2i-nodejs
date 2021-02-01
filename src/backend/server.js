const compression = require('compression');
const express  = require('express');

const config = require('./config');

const appRoutes = require('./api/routes/acronym.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(compression());

app.post('/acronym', (req, res) => {
  console.log(req.body);
  res.status(200).json({ queryString: req.query, message: 'acronym' });
})

app.use('/api', appRoutes);



module.exports = { app, config };

