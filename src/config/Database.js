import { Sequelize } from "sequelize";

const db = new Sequelize("jurnalweb", "postgres", "09071982", {
  dialect: "postgres",
  host: "103.127.133.53",
  port: 5432,
});
  
export default db;
