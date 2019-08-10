import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize(process.env.DATABASE_URL || '', {
  // logging: debug('sql'),
  typeValidation: true,
})

export const loadModels = () => require('./models')
