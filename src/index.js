import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";

import Users from "./models/UserModel.js";
import Banners from "./models/BannerModel.js";

import UserRouter from "./routers/UserRouter.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import BannerRouter from './routers/BannerRouter.js';
import Posts from "./models/PostModel.js";
import Comments from "./models/CommentModel.js";
import Categories from "./models/CategoryModel.js";
import PostRouter from './routers/PostRouter.js'

dotenv.config();

const app = express();

(async () => {
  try {
    await db.authenticate();
    await Users.sync();
    await Categories.sync();
    await Posts.sync();
    await Banners.sync();

    console.log("Database connected successfuly!");

    // Jika database berhasi l terhubung
    app.use(cookieParser());
    app.use(express.json({limit: '50mb'}));
    app.use(express.urlencoded({extended: true}));
    app.use(
      cors({
        credentials: true,
        origin: 'http://localhost:5173',
        preflightContinue: true
      })
    );

    // Routers
    app.get('/', (req, res) => res.json('JURNALISTIK WEB API'));
    app.use(UserRouter);
    app.use(BannerRouter);
    app.use(PostRouter);

    app.listen(443, () => console.log("Server is online!"));
  } catch (error) {
    console.error(error);
  }
})();
