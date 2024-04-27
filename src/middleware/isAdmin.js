import { StatusCodes } from "http-status-codes";

export const isAdmin = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.sendStatus(StatusCodes.FORBIDDEN);
  }
  next();
};
