
// src/models/user.ts
import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../config/db';
import bcrypt from 'bcryptjs';

// Define the interface for the User attributes
interface UserAttributes {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password:string;
  details?: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the User model class
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> implements UserAttributes {
  declare id: CreationOptional<number>;
  declare firstname: string;
  declare lastname: string;
  declare email: string;
  declare password:string;
  declare details?: string;
  declare userId: string;
  declare createdAt?: Date;
  declare updatedAt?: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstname: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    lastname: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    details: {
      type: new DataTypes.STRING(),
      allowNull: true,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    userId: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      defaultValue: '',  // Remove the defaultValue if not needed
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: async (user) => {
        if (!user.userId) {
          // Use a proper random ID generation approach
          user.userId = `USR_${Math.floor(1000000000 + Math.random() * 9000000000)}`; // 10-digit user ID
        }
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

export default User;
