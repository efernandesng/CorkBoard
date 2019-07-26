import Redis from 'ioredis'
import { Request, Response, NextFunction } from 'express'
import { RateLimiterRedis } from 'rate-limiter-flexible'

export default (redis: Redis.Redis) => {
  const rateLimiter = new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: 'rate_limiter',
    points: 10, // 10 requests
    duration: 1, // per 1 second by IP
  })

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await rateLimiter.consume(req.ip)
      next()
    } catch (error) {
      // TODO: log
      res.status(429).send('Too Many Requests')
    }
  }
}
