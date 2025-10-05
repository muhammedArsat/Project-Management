import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from "../configs/Env";
import { JwtPayload } from "../types/jwt.types";
import jwt from "jsonwebtoken";
export const generateAccessToken = (JwtPayload: JwtPayload) => {
  return jwt.sign(JwtPayload, JWT_ACCESS_SECRET as string, {
    expiresIn: "15min",
  });
};

export const generateRefreshToken = (JwtPayload: JwtPayload) => {
  return jwt.sign(JwtPayload, JWT_REFRESH_SECRET as string, {
    expiresIn: "7d",
  });
};
