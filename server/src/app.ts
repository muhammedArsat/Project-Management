import express from "express";
import { errorMiddleware } from "./middlewares/error.middleware";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import { CLIENT_URL } from "./configs/Env";


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);



app.use(errorMiddleware);

export default app;
