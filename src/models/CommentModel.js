import Users from "./UserModel.js";
import db from "../config/Database.js";
import { DataTypes } from "sequelize";

const Comments = db.define(
    'comments',
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            defaultValue: DataTypes.UUIDV4,
        },
        content: {
            type: DataTypes.TEXT
        }
    }
)

export default Comments;