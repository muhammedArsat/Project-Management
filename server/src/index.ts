import app from "./app";
import { PORT } from "./configs/Env";
import { connectMongoDb } from "./configs/mongodb.config";
import { logger } from "./logs/winston.log";


connectMongoDb().then(()=>{
    app.listen(PORT, ()=>{
        logger.info(`server is running on http://localhost:${PORT}`)
    })
})