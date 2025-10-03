import mongoose from "mongoose";
import { MONGODB_URL } from "./Env";
import { logger } from "../logs/winston.log";
export const connectMongoDb = async () => {
    if (!MONGODB_URL) {
        throw new Error("MONGODB_URL is not defined.");
    }
    try {
        await mongoose.connect(MONGODB_URL);
        logger.info("MongoDB connection success...")
    } catch (err) {
        logger.error("MongoDB connection failed...");
        process.exit(1);

    }
}