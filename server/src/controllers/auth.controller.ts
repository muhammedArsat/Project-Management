import { NextFunction, Request, Response } from "express";
import prisma from "../configs/postgres.config";
import { HttpError } from "../types/httpErrors";
import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.utils";
import { JwtPayload } from "../types/jwt.types";
import { JWT_REFRESH_SECRET, NODE_ENV } from "../configs/Env";
import jwt from "jsonwebtoken";
import { uploadImage } from "../utils/imageUpload.utils";
//@route /api/v1/auth/signup POST
//@desc sign up router for new users
//@public
export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    let profile = "";

    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    if (user) {
      const error: HttpError = new HttpError("User already existed", 409);
      return next(error);
    }
    const passwordHash = await bcrypt.hash(password, 10);
    //code to upload profile image in cloudinary
    if (req.file) {
      try {
        profile = await uploadImage(req.file);
      } catch (err) {
        return next(err);
      }
    }
    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        profile,
      },
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    next(err);
  }
};

//@route /api/v1/auth/signin
//@desc user to sign in
//@Public
export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      const error = new HttpError("User Not found", 404);
      return next(error);
    }

    if (!user.passwordHash) {
      const error = new HttpError("Invalid credentials", 401);
      return next(error);
    }

    const isPasswordMatched = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordMatched) {
      const error = new HttpError("Invalid credentials", 401);
      return next(error);
    }

    const JwtPayload: JwtPayload = {
      id: String(user.id),
      email: user.email,
      name: user.name,
      profile: user.profile ?? "",
      role: user.role,
    };

    const accessToken = generateAccessToken(JwtPayload);
    const refreshToken = generateRefreshToken(JwtPayload);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      accessToken,
      message: "Signed in successfully",
    });
  } catch (err) {
    next(err);
  }
};

//@route /api/v1/auth/refresh-token
//@desc client will send request for every 15 mins after access token get expired
//@public
export const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      const error = new HttpError("No refresh token", 401);
      return next(error);
    }
    jwt.verify(
      token,
      JWT_REFRESH_SECRET as string,
      (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) {
          return next(new HttpError("Invalid refresh token", 403));
        }

        const JwtPayload = {
          id: decoded.id,
          email: decoded.email,
          name: decoded.name,
          profile: decoded.profile,
          role: decoded.role,
        };

        const accessToken = generateAccessToken(JwtPayload);
        return res.status(200).json({
          success: true,
          accessToken,
        });
      }
    );
  } catch (err) {
    next(err);
  }
};

//@route /api/v1/auth/user
//@desc to decode access token and get user's information
// @protected
export const userProfile = (req: any, res: Response) => {
  return res.status(200).json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    profile: req.user.profile,
    role: req.user.role,
  });
};

//@ /api/v1/auth/signout
//@ desc to clear refresh token
//@public

export const signout = (req: Request, res: Response) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
  return res.status(200).json({
    success:true,
    message:"signed out successfully"
  })
};
