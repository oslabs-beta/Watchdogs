import { Express, Request, Response, NextFunction } from 'express';

// Import redis from 'redis';
import redis, { RedisClientType} from 'redis';

let redisClient: RedisClientType;
// Dev environment with locally run Redis
if (process.env.NODE_ENV === 'DEV'){
   redisClient = redis.createClient()
} else {
  redisClient = redis.createClient({
    socket: {
      host: "watchdogs-redis",
      port: 6379
    }
  } as any);
}
await redisClient.connect();
const DEFAULT_EXPIRATION = 3600; // Redis keys expire after one hour

// Creates a redis key for each timeframe/increment combination as it is requested
const setCache = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { metrics } = res.locals;
    const { username } = res.locals.user;
    const { timeframe, increment } = req.params;
    await redisClient.setEx(`${username}${timeframe}${increment}`, DEFAULT_EXPIRATION, JSON.stringify(metrics));
    return next();
  } catch (err) {
    return next({ log: 'Error in redisController setCache middleware.', status: 500, message: err });
  }
};

// Checking if a redis key for a timeframe/increment exists in memory
const getCache = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = res.locals.user;
    const { timeframe, increment } = req.params;
    const metrics: string | null = await redisClient.get(`${username}${timeframe}${increment}`);

    // If key exists, exit middlware chain and return key to frontend
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

// Flushes redis cache on refresh button and login/logout
const flushRedis = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await redisClient.flushAll();
    return next();
  } catch (err) {
    return next({ log: 'Error in redisController flushRedis middlware.', status: 500, message: err });
  }
};
export { setCache, getCache, flushRedis };
