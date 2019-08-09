import { Model, DataTypes, BuildOptions } from 'sequelize'
import { sequelize, encryptedFields } from '../sequelize'

class User extends Model {
  public id!: string
  public email!: string
  public username!: string
  public name!: string

  public avatarUrl: string | undefined

  public jwtSecret!: string

  public isAdmin!: boolean
  public isModerator!: boolean

  public lastActiveAt!: Date
  public lastActiveIp: string | undefined

  public suspendedAt: Date | undefined
  public suspendedBy:
    | string
    // timestamps!
    | undefined

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    avatarUrl: { type: DataTypes.STRING, allowNull: true },
    jwtSecret: encryptedFields.vault('jwtSecret'),
  },
  {
    tableName: 'user',
    paranoid: true,
    sequelize,
  }
)
