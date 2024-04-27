import { Router } from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { isAdmin } from "../middleware/isAdmin.js";
import Posts from "../models/PostModel.js";
import Users from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";
import { storage } from '../config/Firebase.js';
import { ref, uploadString, getDownloadURL, listAll } from "firebase/storage";
import { v4 } from 'uuid'

export const getPosts = async (req, res) => {
  const posts = await Posts.findAll({
    include: {
        model: Users,
        as: 'user'
    }
  });
  await res.json(posts);
}

export const getPost = async (req, res) => {
  
}

export const addPosts = async (req, res) => {
    const { userId, title, content, image } = req.body;
    const postId = v4();
    const imageRef = ref(storage, `posts/${postId}`);
    await uploadString(imageRef, image.split(',')[1], 'base64', {
        contentType: image.substring(
            image.indexOf(":") + 1, 
            image.lastIndexOf(";")
        )
    });
    const url = await getDownloadURL(imageRef)
    await Posts.create({
        id: postId,
        banner: url,
        title,
        content,
        userId
    })
    return res.status(StatusCodes.CREATED).json({msg: 'Post berhasil ditambah.'});
}

export const deletePosts = async (req, res) => {
   
}