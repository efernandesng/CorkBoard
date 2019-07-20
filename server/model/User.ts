import DAO from './DAO'

class User extends DAO {
  constructor() {
    super()

    this.tblName = 'User'
    this.primaryKey = 'id'
  }
}

export default User
