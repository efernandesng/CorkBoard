import { createServer } from 'http'
import { parse } from 'url'
import next from 'next'
import Logger from './Logger'
import Db from './db'

const logger = Logger.logger

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(async () => {
  // const client = await Db.Instance.getClient()
  // try {
  //   const res = await client.query('SELECT NOW()')
  //   console.log(res.rows[0])
  // } catch (error) {
  //   console.log(error.stack)
  // } finally {
  //   client.release()
  // }
  // const res = await Db.Instance.query('SELECT NOW()')
  // console.log(res.rows[0])

  createServer((req, res) => {
    const parsedUrl = parse(req.url!, true)
    const { pathname, query } = parsedUrl

    handle(req, res, parsedUrl)
  }).listen(port)

  logger.info(
    `> Server listening at http://localhost:${port} as ${
      dev ? 'development' : process.env.NODE_ENV
    }`
  )
})
