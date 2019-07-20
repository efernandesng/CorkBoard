import Db from '../db'

abstract class DAO {
  protected db: Db
  protected tblName: string
  protected primaryKey: string

  constructor() {
    this.db = Db.Instance
  }
}

export default DAO
