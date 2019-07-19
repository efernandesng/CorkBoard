import BaseModel from './BaseModel'

class User extends BaseModel {

    constructor() {
        super()

        this.tblName = 'User'
    }
}

export default User
