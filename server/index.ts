import dotenv from 'dotenv'
import express from 'express'
import session, { SessionOptions } from 'express-session'
import connectRedis from 'connect-redis'
import passport from 'passport'
import next from 'next'
import Redis from 'ioredis'

import { parse } from 'url'
import Logger from './Logger'

// Load .env
dotenv.config()

// Express middleware
import helmet from 'helmet'
import rateLimiterRedis from './middleware/rateLimiterRedis'

import auth from './auth'

const logger = Logger.logger

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const initRedis = async () => {
  const redis = new Redis(process.env.REDIS_HOST || 'localhost', {
    enableOfflineQueue: false,
  })

  redis.on('connect', () => logger.info(`Connection with redis established!`))
  redis.on('error', err => logger.error(err))
  redis.on('reconnecting', () => logger.warn('Reconnecting to redis server'))

  return redis
}

const initExpress = async (redisClient: Redis.Redis) => {
  const server = express()

  // disable X-Powered-By header
  server.disable('x-powered-by')

  // Use Helmet: protect from some well-known web vulnerabilities by setting HTTP headers appropriately
  server.use(helmet())
  // Rate limiter https://github.com/animir/node-rate-limiter-flexible
  server.use(rateLimiterRedis(redisClient))

  // Session
  const RedisStore = connectRedis(session)
  // TODO: Use ioredis client
  const store = new RedisStore({
    url: process.env.REDIS_URL,
  })

  const sessionOptions: SessionOptions = {
    name: 'cbsid',
    resave: false,
    saveUninitialized: false,
    secret: process.env.SECRET_KEY,
    store,
  }

  if (server.get('env') === 'production') {
    server.set('trust proxy', 1)
    sessionOptions.cookie.secure = true // serve secure cookies
  }

  server.use(session(sessionOptions))
  // TODO: use redis store

  // OAuth2
  server.use(passport.initialize())
  server.use(passport.session())

  server.use('/auth', auth)

  server.get('/logout', (req, res) => {
    return
  })
  // TODO: Create router for API

  // handle nextjs routing
  server.get('*', (req, res) => handle(req, res, parse(req.url || '', true)))

  try {
    await server.listen(port)
    logger.info(
      `Server listening at http://localhost:${port} as ${
        dev ? 'development' : process.env.NODE_ENV
      }`
    )
  } catch (error) {
    logger.crit(`Fail to listening on port ${port}`, error)
    process.exit(1)
  }
}

const startServer = async () => {
  // Init NextJs
  await app.prepare()

  try {
    // Init Database
    // const pool = initDB()

    // Init Redis (Cache)
    const redis = await initRedis()

    // Init Express (HTTP/Websocket)
    initExpress(redis)
  } catch (error) {
    logger.crit(error)
    process.exit(1)
  }
}

startServer()
