import { Express, Request, Response, NextFunction } from 'express';

import redis from 'redis';

const redisClient = redis.createClient();
await redisClient.connect();
const DEFAULT_EXPIRATION = 3600;

const setCache = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { metrics } = res.locals;
    await redisClient.setEx('metrics', DEFAULT_EXPIRATION, JSON.stringify(metrics));
    return next();
  } catch (err) {
    return next({ log: 'Error in redisController setCache middleware.', status: 500, message: err });
  }
};

const getCache = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const metrics: string | null = await redisClient.get('metrics');
    if (metrics !== null) {
      res.locals.metrics = JSON.parse(metrics);
      res.status(200).json(res.locals);
    } else {
      return next();
    }
  } catch (err) {
    return next({ log: 'Error in redisController getCache middleware.', status: 500, message: err });
  }
};

const flushRedis = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('before flush')
    await redisClient.flushAll();
    console.log('after flush')
    return next();
  } catch (err) {
    return next({ log: 'Error in redisController flushRedis middlware.', status: 500, message: err });
  }
};
export { setCache, getCache, flushRedis };
