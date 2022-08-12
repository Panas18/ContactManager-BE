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
 * Update User
 * @param { Request }req
 * @param { Response}res
 * @param {NextFunction }next
 */
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = { ...req.body, user_id: +req.params.user_id };
  userService
    .updateUser(user)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Delete User
 * @param { Request }req
 * @param { Response}res
 * @param {NextFunction }next
 */
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.params.user_id;
  userService
    .deleteUser(+user_id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Get User by email
 * @param { Request }req
 * @param { Response}res
 * @param {NextFunction }next
 */
export const getUserByEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const email = req.body.email;
  userService
    .getUserByEmail(email)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};

/**
 * Get user by Id
 * @param { Request }req
 * @param { Response}res
 * @param {NextFunction }next
 */
export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user_id = req.params.user_id;
  console.log(user_id);

  userService
    .getUserById(+user_id)
    .then((data) => res.json(data))
    .catch((err) => next(err));
};
