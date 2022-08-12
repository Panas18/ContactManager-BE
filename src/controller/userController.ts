import { Request, Response, NextFunction } from "express";
import * as userService from "../service/userService";

/**
 * Get all users
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction}next
 */
export const getAllUsers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  userService
    .getAllUsers()
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Get all users
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction}next
 */
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  userService
    .createUser(req.body)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 *
 * @param { Request }req
 * @param { Response}res
 * @param {NextFunction }next
 */
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = { ...req.body, user_id: +req.params.userId };
  userService
    .updateUser(user)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.params.userId;
  userService
    .deleteUser(+user_id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
