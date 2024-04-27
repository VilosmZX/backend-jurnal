import { Router } from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { isAdmin } from "../middleware/isAdmin.js";
import Banners from "../models/BannerModel.js";
import { StatusCodes } from "http-status-codes";
import { storage } from '../config/Firebase.js';
import { ref, uploadString, getDownloadURL, listAll } from "firebase/storage";
import { v4 } from 'uuid'

export const getBanners = async (req, res) => {
    const currentBanner = (await Banners.findAll())[0];
    const imageRef = ref(storage, `banners/${v4()}`);
    if (!req.body.url) {
        await uploadString(imageRef, req.body.image.split(',')[1], 'base64', {
            contentType: req.body.image.substring(
                req.body.image.indexOf(":") + 1, 
                req.body.image.lastIndexOf(";")
            )
        });
        const url = await getDownloadURL(imageRef)
        await currentBanner.update({
            image: url
        })
        res.status(StatusCodes.CREATED).json(url);
    } else {
        await currentBanner.update({
            image: req.body.url
        })
        res.sendStatus(StatusCodes.CREATED);
    }
}

export const getCurrentBanner = async (req, res) => {
    // await Banners.create({
    //     image: ''
    // });
    const banners = await Banners.findOne();
    res.status(StatusCodes.OK).json({image: banners.image});
}

export const addBanner = async (req, res) => {
    const imageRef = ref(storage, 'banners');
    const response = await listAll(imageRef);
    let data = [];
    for(let i = 0; i < response.items.length; i++) {
        data.push(await getDownloadURL(response.items[i]));
    }       
    res.status(StatusCodes.OK).json(data);
}