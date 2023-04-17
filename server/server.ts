//IMPORT DEPENDECIES
import express, {Express, Request, Response, NextFunction, ErrorRequestHandler} from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';


//IMPORT CONTROLLERS
import { createAccount, getUser, deleteUser, addArn, logIn } from './controllers/userController.js';
import { setCookie, checkCookie } from './controllers/cookieController.js';
import { getMetrics } from './controllers/AWScontroller.js'
import { setCache, getCache } from './controllers/redisController.js';

const port = 3000;

//CREATE APP AND PARSE 
const app: Express = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb+srv://watchdogsadmin:watchdogsECRI39@watchdogs.r5ylian.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
})

//ROUTER FOR /API
const router = express.Router();
app.use('/api', router);

router.get('/user', checkCookie, getUser, getCache, getMetrics, setCache, (req: Request, res: Response) => {
  res.status(200).json(res.locals)
})

router.delete('/user', deleteUser, (req: Request, res: Response) => {
  res.status(200).json(res.locals.user)
})
router.post('/signup', createAccount, setCookie, (req: Request, res: Response) => {
  res.status(200).json(res.locals)
})

router.post('/login', logIn, setCookie, (req: Request, res: Response) => {
  res.status(200).json(res.locals)
})

router.put('/', addArn, (req: Request, res: Response) => {
  res.status(200).json(res.locals.user)
})
//Serve static files
app.get('/', (req: Request, res: Response) => {
  res.status(200).sendFile(__dirname, '../index.html')
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