import express, {Express, Request, Response} from 'express'
const app: Express = express()
import path from 'path';
import mongoose from 'mongoose';
const port = 3000
import cookieParser from 'cookie-parser';

mongoose.connect('mongodb+srv://watchdogsadmin:watchdogsECRI39@watchdogs.r5ylian.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
})
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello, this is Typescript')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

export default app;