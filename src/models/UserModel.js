import db from "../config/Database.js";
import { DataTypes } from "sequelize";
import Posts from "./PostModel.js";
import Comments from "./CommentModel.js";

const Users = db.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    photo_profile: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    refresh_token: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);
Users.hasMany(Posts, {as: 'posts'});
Posts.belongsTo(Users, {
  foreignKey: 'userId',
  as: 'user'
})

export default Users;
