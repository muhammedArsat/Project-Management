import { Router } from "express";
import { refreshToken, signin, signout, signup, userProfile } from "../controllers/auth.controller";
import upload from "../middlewares/upload.middleware";
import passport from "passport";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.utils";
import { protectedMiddleware } from "../middlewares/protected.middlewate";

const routes = Router();

routes.post("/signup", upload.single("profile"), signup);
routes.post("/signin", signin);
routes.post("/refresh-token", refreshToken);
routes.get('/user',protectedMiddleware,userProfile)
routes.post('/signout',signout)
routes.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

routes.get(
  "/google/callback",

  passport.authenticate("google", { session: false, failureRedirect: "/" }),
  (req, res) => {
    const user = req.user as {id:string, email:string, profile:string, name:string, role:string};

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
        success:"true",
        message:"user logged in",
        accessToken
    })
  }
);


export default routes;
