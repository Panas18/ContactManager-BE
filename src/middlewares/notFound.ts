import { StatusCodes } from "http-status-codes";

import CustomError from "../misc/customError";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware to handle notFound error
 * @param req {Request}
 * @param next {NextFunction}
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new CustomError(
    `NotFound - ${req.originalUrl}`,
    StatusCodes.NOT_FOUND
  );
  next(error);
};
