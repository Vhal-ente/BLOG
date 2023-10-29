import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
import { number } from "joi";
import { BlogInstance } from "../model/blogCategory";
export interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  userName: string | number;
  password: string;
  phonenumber: number;
  email: string;
}

export class UserInstance extends Model<UserAttributes> {
  id!: string;
  firstName!: string;
  userName!: string;
  email!: string;
  password!: string;
}

UserInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phonenumber: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },

  { sequelize: db, tableName: "users" }
);

UserInstance.hasMany(BlogInstance, { foreignKey: "user", as: "blogs" });
BlogInstance.belongsTo(UserInstance, { foreignKey: "user", as: "users" });
