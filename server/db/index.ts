import { Pool, QueryArrayResult } from 'pg'

class Db {

    private static instance: Db
    private pool: Pool

    private constructor() {
        this.pool = new Pool()
    }

    static get Instance() {
        return this.instance || (this.instance = new this())
    }

    public async query(text: string, values: any[]): Promise<QueryArrayResult> {
        const start = Date.now()
        const res = await this.pool.query(text, values)
        const duration = Date.now() - start
        // tslint:disable-next-line: no-console
        console.log('executed query', { text, duration, rows: res.rowCount })
        return res
    }

    public async getClient(): Promise<any> {
        const client = await this.pool.connect()
        // TODO: https://node-postgres.com/guides/project-structure
        return client
    }
}

export default Db
