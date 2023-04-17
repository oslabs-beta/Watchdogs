import {Express, Request, Response, NextFunction} from 'express';

import redis from "redis"
import * as util from "util"

const redisClient = redis.createClient()
await redisClient.connect()
const DEFAULT_EXPIRATION = 3600


const setCache = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {metrics}  = res.locals
        console.log("IN SETCACHE, metrics from locals: ", metrics)
        await redisClient.setEx("metrics", DEFAULT_EXPIRATION, JSON.stringify(metrics))
        return next()
    } catch (err){
        return next({log: 'Error in redisController setCache middleware.', status: 500, message: err})
    }

}

const getCache = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const metrics = await redisClient.get('metrics');
      if (metrics!==null){
        res.locals.metrics = JSON.parse(metrics);
        res.status(200).json(res.locals)
      } else {
        return next()
      } 
    } catch (err){
        return next({log: 'Error in redisController getCache middleware.', status: 500, message: err})
    }
}

export {
    setCache,
    getCache
}