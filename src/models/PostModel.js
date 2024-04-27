import db from "../config/Database.js";
import { DataTypes } from "sequelize";
import Comments from "./CommentModel.js";

const Posts = db.define(
    "posts",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            defaultValue: DataTypes.UUIDV4,
        },
        banner: {
            type: DataTypes.TEXT
        },
        title: {
            type: DataTypes.TEXT
        },
        content: {
            type: DataTypes.TEXT
        }
    }
)

export default Posts;