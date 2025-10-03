import dotenv from "dotenv";
dotenv.config({
  quiet: true,
});

export const PORT = process.env.PORT;
export const NODE_ENV = process.env.NODE_ENV;
export const MONGODB_URL = process.env.MONGODB_URL;
export const POSTGRES_URL = process.env.POSTGRES_URL;
export const CLIENT_URL = process.env.CLIENT_URL;
export const SERVER_URL = process.env.SERVER_URL;
