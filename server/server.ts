import express, {Express, Request, Response, NextFunction, ErrorRequestHandler} from 'express'
const app: Express = express()
import path from 'path';
import mongoose from 'mongoose';
import userController from './controllers/userController.js';
import cookieController from './controllers/cookieController.js';
// const {createAccount, logIn, getUser, addArn} = userController
const port = 3000;
import cookieParser from 'cookie-parser';
import { request } from 'http';
app.use(express.urlencoded());
const router = express.Router();

mongoose.connect('mongodb+srv://watchdogsadmin:watchdogsECRI39@watchdogs.r5ylian.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
})
app.use(express.json());
app.use(cookieParser());



app.use('/api', router);
app.get('/', (req: Request, res: Response) => {
    res.status(200).sendFile(__dirname, '../index.html')
})

router.post('/signup', userController.createAccount, (req: Request, res: Response) => {
  res.status(200).json(res.locals.newUser)
})

router.post('/login', userController.logIn, cookieController.setCookie, (req: Request, res: Response) => {
  res.status(200).json(res.locals)
})

router.get('/', userController.getUser, (req: Request, res: Response) => {
  res.status(200).json(res.locals.user)
})

router.put('/', userController.addArn, (req: Request, res: Response) => {
  res.status(200).json(res.locals.user)
})



//Catch-all error handler:
app.use((req: Request, res: Response) => res.sendStatus(404));

//Global error handler:
app.use((err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  return res.status(errorObj.status).json(errorObj.message);
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

export default app;