import { Sequelize } from 'sequelize'
import EncryptedField from 'sequelize-encrypted'

export const encryptedFields = EncryptedField(Sequelize, process.env.SECRET_KEY)

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
  // logging: debug('sql'),
  typeValidation: true,
})
