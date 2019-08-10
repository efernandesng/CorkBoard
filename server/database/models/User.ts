import { Model, DataTypes, BuildOptions } from 'sequelize'
import { sequelize } from '../sequelize'

class User extends Model {
  public id!: string
  public authProvider!: string
  public providerId?: string
  public accessToken?: string

  public fullName!: string
  public email!: string
  public avatarUrl?: string

  public username!: string
  public jwtSecret!: string

  public isAdmin!: boolean
  public isModerator!: boolean

  public lastActiveAt!: Date
  public lastActiveIp?: string

  public suspendedAt?: Date
  public suspendedBy?: string

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
    authProvider: {
      type: DataTypes.ENUM('local', 'google', 'facebook'),
      defaultValue: 'local',
    },
    providerId: { type: DataTypes.STRING, allowNull: true },
    accessToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: { type: DataTypes.STRING },
    username: { type: DataTypes.STRING },
    fullName: { type: DataTypes.STRING },
    avatarUrl: { type: DataTypes.STRING, allowNull: true },
    jwtSecret: { type: DataTypes.STRING, allowNull: true },
  },
  {
    tableName: 'user',
    paranoid: true,
    sequelize,
  }
)

export default User
