import cookieParser from 'cookie-parser';
import express from 'express';
import flash from 'connect-flash';
import passport from 'passport';
import session from 'express-session';
import { createServer } from 'http';

import orderRouter from './routes/order.router.js';
import authRouter from './routes/auth.router.js';

const app = express();

app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'vulnerability-secret',
    resave: false,
    saveUninitialized: false
}));

const sessionMiddleware = passport.authenticate('session');

app.use('/auth', authRouter);
app.use('/orders', sessionMiddleware, orderRouter);

app.use((req, res, next) => { next(createError(404)); });

const server = createServer(app);
server.listen(port, '0.0.0.0', () => {
  let serverAddress = server.address();
  let { address } = serverAddress;
  if(address === '0.0.0.0' || address === '::') {
    address = '192.168.0.21';
  }
  app.set('address', address);
  console.log(`Listening on http://${address}:${port} or http://localhost:${port}`);
});
