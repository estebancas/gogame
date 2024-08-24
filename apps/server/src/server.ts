import express, { Application } from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';

import { routes } from './routes';

const app: Application = express();

/**
 * Creates server and port listener
 */
export const createServer = async () => {
  app.use(bodyParser.json());
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }))

  routes(app)

  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
}
