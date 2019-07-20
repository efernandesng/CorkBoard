import { PoolClient, QueryArrayResult, QueryConfig, QueryResult } from 'pg'

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
      // tslint:disable-next-line: no-console
      console.error('A client has been checked out for more than 5 seconds!')
      // tslint:disable-next-line: no-console
      console.error(
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
