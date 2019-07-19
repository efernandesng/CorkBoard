import Db from '../db'

abstract class BaseModel {

    set tblName(name: string) {
        this.tblName = name
    }

    get tblName(): string {
        return this.tblName
    }
    protected db: Db
    // private tblName: string

    constructor() {
        this.db = Db.Instance
    }
}

export default BaseModel
