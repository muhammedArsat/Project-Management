import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import { CLIENT_URL } from "./configs/Env";
import authRoutes from "./routes/auth.routes";
import passport from "./configs/passport.config";

const app = express();
app.use(express.json());
app.use(passport.initialize())
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use("/api/v1/auth", authRoutes);

app.use(errorMiddleware);

export default app;
