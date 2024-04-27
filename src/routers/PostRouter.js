import { Router } from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { isAdmin } from "../middleware/isAdmin.js";
import Banners from "../models/BannerModel.js";
import { StatusCodes } from "http-status-codes";
import { storage } from '../config/Firebase.js';
import { ref, uploadString, getDownloadURL, listAll } from "firebase/storage";
import { v4 } from 'uuid'
import { getPosts, addPosts, deletePosts, getPost } from "../controllers/PostController.js";

const router = Router();

router.get('/posts', getPosts);
router.post('/posts', verifyToken, isAdmin, addPosts)
router.get('/posts/:id', getPost)


export default router;