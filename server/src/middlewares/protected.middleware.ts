import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "../types/httpErrors";
import { JWT_ACCESS_SECRET } from "../configs/Env";

export const protectedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) {
      const error = new HttpError("Token is missing", 401);
      next(error);
    }
    const decoded = jwt.verify(token, JWT_ACCESS_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (err) {
    return next(new HttpError("Invalid or expired access token", 401));
  }
};

//@desc Middleware to check the role is ADMIN
export const adminProtectedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;
    if (!user) {
       next(new HttpError("User not authenticated", 401));
    }
    const role = user.role;

    if (role !== "ADMIN") {
      const error = new HttpError("Insufficient permissions", 403);
       next(error);
    }

    next();
  } catch (err) {
    next(err);
  }
};

//@desc Middleware to check the role is OWNER
export const ownerProtectedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;
    if (!user) {
      return next(new HttpError("User not authenticated", 401));
    }
    const role = user.role;

    if (role !== "OWNER") {
      const error = new HttpError("Insufficient permissions", 403);
      return next(error);
    }

    next();
  } catch (err) {
    next(err);
  }
};

//@desc Middleware to check the role is OWNER or ADMIN
export const adminAndOwnerProtectedMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (req as any).user;
    if (!user) {
      return next(new HttpError("User not authenticated", 401));
    }
    const role = user.role;

    if (role === "MEMBER") {
      const error = new HttpError("Insufficient permissions", 403);
      return next(error);
    }
    next();
  } catch (err) {
    next(err);
  }
};
