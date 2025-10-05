import { NextFunction, Request, Response } from "express";
import { HttpError } from "../types/httpErrors";
import { logger } from "../logs/winston.log";

export const errorMiddleware = (
  err: Error | HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      success:false,
      message: err.message,
    });
  }
  logger.error(err.message);
  return res.status(500).json({
    success:false,
    message: "Internal server error",
  });
};
