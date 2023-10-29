import { DataTypes, Model } from "sequelize";
import db from '../config/database.config'

export interface Like {
    id: number;
    postId: number;
    userId: number;
    createdAt: Date;
  }
  


export class BlogInstance extends Model<Like> {}

BlogInstance.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },

  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
},
  {sequelize: db, tableName: 'blogs'}
  
);
