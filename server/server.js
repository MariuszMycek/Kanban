const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const dev = process.env.NODE_DEV !== 'production'; // true false
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler(); // part of next config
const mongoose = require('mongoose');
import serverConfig from './config';

import lanes from './routes/lane.routes';
import notes from './routes/note.routes';

mongoose.Promise = global.Promise;
mongoose.connect(serverConfig.mongoURL, error => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

nextApp.prepare().then(() => {
  // express code here
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use('/api', lanes);
  app.use('/api', notes);
  app.get('*', (req, res) => {
    return handle(req, res); // for all the react stuff
  });
  app.listen(serverConfig.port, err => {
    if (err) throw err;
    console.log(`Ready at http://localhost:${serverConfig.port}`); // eslint-disable-line no-console
  });
});
