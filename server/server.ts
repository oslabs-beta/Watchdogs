// Imports
import express, { Express, Request, Response, NextFunction, ErrorRequestHandler, Router } from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';

// Types Imports
import { GlobalErrorType } from './types.js';

// Controller Imports
import { createAccount, getUser, deleteUser, addArn, logIn } from './controllers/userController.js';
import { setCookie, checkCookie, deleteCookie } from './controllers/cookieController.js';
import { getMetrics, getErrors } from './controllers/AWScontroller.js';
import { setCache, getCache, flushRedis } from './controllers/redisController.js';

dotenv.config();
declare let process: {
  env: {
    accessKeyId: string;
    secretAccessKey: string;
    mongoKey: string;
  };
};
// Create App
const port = 3000;
const app: Express = express();

// Global Middleware
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

// MongoDB connection
mongoose.connect(process.env.mongoKey);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

// /api
const router: Router = express.Router();
app.use('/api', router);

// Flush redis cache and update metrics on page
router.get('/refresh/:timeframe/:increment', flushRedis, getUser, getMetrics, setCache, (req: Request, res: Response) => {
  res.status(200).json(res.locals);
});

// Populate metrics on page, not as a refresh; checks redis cache first
router.get('/user/:timeframe/:increment', checkCookie, getUser, getCache, getMetrics, setCache, (req: Request, res: Response) => {
  res.status(200).json(res.locals);
});

// Delete the user's account from the database
router.delete('/user', deleteUser, deleteCookie, (req: Request, res: Response) => {
  res.status(200).json(res.locals);
});

// Flush redis cache, create a new user account, then set cookie
router.post('/signup', flushRedis, createAccount, setCookie, (req: Request, res: Response) => {
  res.status(200).json(res.locals);
});

// Flush redis cache, log user in and set cookie
router.post('/login', flushRedis, logIn, setCookie, (req: Request, res: Response) => {
  res.status(200).json(res.locals);
});

// Logs user out
router.get('/logout', flushRedis, deleteCookie, (req: Request, res: Response) => {
  res.sendStatus(200);
});

// Updates user's ARN/Region
router.put('/', addArn, getMetrics, setCache, (req: Request, res: Response) => {
  res.status(200).json(res.locals);
});

// Returns error logs
router.post('/error', getErrors, (req: Request, res: Response) => {
  res.status(200).json(res.locals.errors);
})

//Serve static files
app.get('/', (req: Request, res: Response) => {
  res.status(200).sendFile(__dirname, '../index.html');
});

//Catch-all error handler:
app.use((req: Request, res: Response) => res.sendStatus(404));

//Global error handler:
app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  const defaultErr: GlobalErrorType = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj: GlobalErrorType = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

export default app;
