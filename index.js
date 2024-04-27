import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "../src/config/Database.js";

import Users from "../src/models/UserModel.js";
import Banners from "../src/models/BannerModel.js";

import UserRouter from "../src/routers/UserRouter.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import BannerRouter from '../src/routers/BannerRouter.js';
import Posts from "../src/models/PostModel.js";
import Comments from "../src/models/CommentModel.js";
import Categories from "../src/models/CategoryModel.js";
import PostRouter from '../src/routers/PostRouter.js'

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

    app.listen(5000, () => console.log('Server is Online'));
  } catch (error) {
    console.error(error);
  }
})();

export default app;
