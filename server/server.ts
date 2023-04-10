import express, {Express, Request, Response} from 'express'
const app: Express = express()
import path from 'path';
const port = 3000
// import cookieParser from 'cookie-parser'

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello, this is Typescript')
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})