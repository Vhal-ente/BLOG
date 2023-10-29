import { DataTypes, Model } from "sequelize";
import db from "../config/database.config";
import { UserInstance } from "./user";

export interface blogAttributes {
  id: string;
  title: string;
  coverImage: string;
  content: string;
  blogcategory: string;
  user: string;
  isActive: boolean;
  // author?: UserInstance;
}

export class BlogInstance extends Model<blogAttributes> {}

BlogInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    coverImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blogcategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    // author: {
    //   type: DataTypes.UUID,
    //   allowNull: true,
    //   references: {
    //     model: "UserInstance",
    //     key: "id",
    //   },
    // },
  },
  { sequelize: db, tableName: "blogs" }
);
