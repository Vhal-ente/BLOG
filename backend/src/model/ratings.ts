import { DataTypes, Model } from "sequelize";
import db from '../config/database.config'

interface Rating {
    userId: number;         
    postId: number;   
    rating: number;     
    timestamp: Date; 
}     

  export class BlogInstance extends Model<Rating> {}

  BlogInstance.init({
    userId: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
  
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
      },

},
  {sequelize: db, tableName: 'blogs'}
  
);
