import { DataTypes, Model } from "sequelize";
import db from '../config/database.config'

export interface blogAttributes {
    id: string,
    name: string,
}



export class BlogInstance extends Model<blogAttributes> {}

BlogInstance.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
  {sequelize: db, tableName: 'blogs'}
  
);
