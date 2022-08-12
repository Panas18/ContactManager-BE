import { NextFunction, Request, Response } from "express";
import * as userService from "../service/userService";

export const loginUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  userService
    .loginUser(email, password)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
