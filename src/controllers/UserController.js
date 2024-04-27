import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { storage } from "../config/Firebase.js";
import { ref } from 'firebase/storage';

export const getUsers = async (req, res) => {
  try {
    const users = await Users.findAll({
      attributes: {
        exclude: ["password", "refreshToken", "id"],
      },
    });
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};

export const registerUser = async (req, res) => {
  const { firstName, lastName, username, email, password, confirmPassword } =
    req.body;

  const user = await Users.findOne({
    where: {
      email,
    },
  });

  if (user)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Email sudah terdaftar" });

  if (password != confirmPassword)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Konfirmasi password tidak valid." });
  if (password.length < 8)
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Password harus 8 karakter atau lebih." });
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    await Users.create({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });
    res.status(StatusCodes.CREATED).json({ msg: "Akun berhasil dibuat." });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
      where: {
        email,
      },
    });
    if (!user)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Akun tidak terdaftar." });
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched)
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Password salah." });
    const data = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      password: user.password,
    };
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "15s",
    });
    const refreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "30d",
    });
    await Users.update(
      {
        refresh_token: refreshToken,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      // secure: true
    });
    res.json({ accessToken });
  } catch (error) {
    console.log(error);
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken?.replaceAll(" ", "");
    if (!refreshToken) return res.sendStatus(StatusCodes.UNAUTHORIZED);
    const user = await Users.findOne({
      where: {
        refresh_token: refreshToken,
      },
    });
    if (!user) return res.sendStatus(StatusCodes.FORBIDDEN);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, _) => {
      if (err) return res.sendStatus(StatusCodes.FORBIDDEN);
      const data = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
        photo_profile: user.photo_profile,
      };
      const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15s",
      });
      res.json({ accessToken });
    });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  const refreshToken = req.cookies?.refreshToken?.replaceAll(" ", "");
  if (!refreshToken) return res.sendStatus(StatusCodes.NO_CONTENT);
  const user = await Users.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user) return res.sendStatus(StatusCodes.NO_CONTENT);
  await user.update({
    refresh_token: null,
  });
  res.clearCookie("refreshToken");
  res.sendStatus(StatusCodes.OK);
};

export const updateUser = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
}
