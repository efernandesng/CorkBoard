import express from 'express'
import next from 'next'

import { createServer } from 'http'
import { parse } from 'url'
import Logger from './Logger'
import Db from './db'

const logger = Logger.logger

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const startServer = async () => {
  await app.prepare()
  const server = express()

  // TODO: Create router for API

  server.get('*', (req, res) => handle(req, res, parse(req.url || '', true)))

  server.listen(port, err => {
    if (err) throw err

    logger.info(
      `> Server listening at http://localhost:${port} as ${
        dev ? 'development' : process.env.NODE_ENV
      }`
    )
  })
}

startServer()
