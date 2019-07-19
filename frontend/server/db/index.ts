import { Pool, QueryArrayResult } from 'pg'

class Db {

    private static _instance: Db
    private pool: Pool

    private constructor() {
        this.pool = new Pool()
    }

    static get Instance() {
        return this._instance || (this._instance = new this())
    }

    async query(text: string, values: any[]): Promise<QueryArrayResult> {
        const start = Date.now()
        const res = await this.pool.query(text, values)
        const duration = Date.now() - start
        console.log('executed query', { text, duration, rows: res.rowCount })
        return res
    }

    async getClient(): Promise<any> {
        const client = await this.pool.connect()
        //TODO: https://node-postgres.com/guides/project-structure
        return client
    }
}

export default Db
