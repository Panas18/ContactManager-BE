import CustomError from "../misc/customError";
import { Request, Response, NextFunction } from "express";

/**
 *
 * @param err {CustomError}
 * @param req {Request}
 * @param res {Response}
 * @param next {NextFunction}
 */
export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
