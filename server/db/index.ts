import { Pool, QueryArrayResult, PoolConfig } from 'pg'
import Client from './lib/Client'

class Db {
  private static instance: Db
  private pool: Pool

  private constructor(config?: PoolConfig) {
    this.pool = new Pool(config)
  }

  static get Instance() {
    return this.instance || (this.instance = new this())
  }

  public async query(
    queryText: string,
    values?: any[]
  ): Promise<QueryArrayResult> {
    const start = Date.now()
    let res
    try {
      res = await this.pool.query(queryText, values)
    } catch (error) {
      // tslint:disable-next-line: no-console
      console.error(error)
    } finally {
      const duration = Date.now() - start
      // tslint:disable-next-line: no-console
      console.log('executed query', {
        text: queryText,
        duration,
        rows: res.rowCount,
      })
    }

    return res
  }

  // https://node-postgres.com/guides/project-structure
  public async getClient(): Promise<Client> {
    const poolClient = await this.pool.connect()

    return new Client(poolClient)
  }
}

export default Db
