import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(StatusCodes.UNAUTHORIZED);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(StatusCodes.FORBIDDEN);
    req.user = user;
    next();
  });
};
