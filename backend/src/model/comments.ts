import { DataTypes, Model } from "sequelize";
import db from '../config/database.config'


interface Comments {
    id: number;
    author: string; 
    content: string; 
    timestamp: Date; 
  }
  
  
export class BlogInstance extends Model<Comments> {}

BlogInstance.init({
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },

  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },

},
//   const newComment: Comment[] = [
//     // Add more comments hers needed
//   ];
  
  {sequelize: db, tableName: 'blogs'}
  
);


