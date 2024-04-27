import db from "../config/Database.js";
import { DataTypes } from "sequelize";
import Posts from "./PostModel.js";

const Categories = db.define(
    "Categories",
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            unique: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
        }
    }
)
Categories.hasMany(Posts, {as: 'posts'});
Posts.belongsTo(Categories, {
    foreignKey: 'categoryId',
    as: 'category'
});

export default Categories;