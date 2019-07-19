import Db from '../db'

abstract class BaseModel {
    private _tblName: string
    protected db: Db

    constructor() {
        this.db = Db.Instance
    }

    set tblName(name: string) {
        this._tblName = name
    }

    get tblName(): string {
        return this._tblName
    }
}

export default BaseModel
