import Db from '../db'

abstract class BaseModel {
  protected db: Db
  protected tblName: string

  constructor() {
    this.db = Db.Instance
  }
}

export default BaseModel
