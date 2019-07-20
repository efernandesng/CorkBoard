import { PoolClient, QueryArrayResult, QueryConfig, QueryResult } from 'pg'
import Logger from '../../Logger'

const logger = Logger.logger

class Client {
  private poolClient: PoolClient
  private rTimeout: NodeJS.Timeout

  constructor(poolClient: PoolClient) {
    this.poolClient = poolClient
  }

  public query(
    queryTextOrConfig: string | QueryConfig,
    values?: any[]
  ): Promise<QueryResult> {
    this.rTimeout = global.setTimeout(() => {
      logger.warn('A client has been checked out for more than 5 seconds!')
      logger.warn(
        `The last executed query on this client was: '${queryTextOrConfig}' ${
          values ? values.toString() : ''
        }`
      )
    }, 5000)

    return this.poolClient.query(queryTextOrConfig, values)
  }

  public release(err?: Error) {
    this.poolClient.release(err)

    // Clear timeout
    global.clearInterval(this.rTimeout)
  }
}

export default Client
