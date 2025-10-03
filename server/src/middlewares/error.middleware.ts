import { NextFunction, Request, Response } from "express";
import { HttpError } from "../types/httpErrors";

export const errorMiddleware = (
  err: Error | HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
};
