import db from "../config/Database.js";
import { DataTypes } from "sequelize";

const Banners = db.define(
  "banners",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValue: DataTypes.UUIDV4,
    },
    image: {
        type: DataTypes.STRING,
    }
  },
  {
    freezeTableName: true,
  }
);

export default Banners;
