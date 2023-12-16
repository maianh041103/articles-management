import { Request, Response, NextFunction } from "express";
import User from "../models/user";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = await User.findOne({
      token: token,
      deleted: false
    }).select("-password");
    req["user"] = user;
  }
  next();
}