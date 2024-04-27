import { Router } from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { isAdmin } from "../middleware/isAdmin.js";
import Banners from "../models/BannerModel.js";
import { StatusCodes } from "http-status-codes";
import { storage } from '../config/Firebase.js';
import { ref, uploadString, getDownloadURL, listAll } from "firebase/storage";
import { v4 } from 'uuid'
import { getBanners, getCurrentBanner, addBanner } from "../controllers/BannerController.js";

const router = Router();

router.post('/banners', verifyToken, isAdmin, getBanners)

router.get('/current-banner', getCurrentBanner)

router.get('/banners', verifyToken, isAdmin, addBanner);

export default router;