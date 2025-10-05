import { NextFunction,Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpError } from '../types/httpErrors';
import { JWT_ACCESS_SECRET } from '../configs/Env';

export const protectedMiddleware = (req:Request, res:Response, next:NextFunction)=>{
    try{
    
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return next(new HttpError("access token is missing", 401));
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, JWT_ACCESS_SECRET as string);
        (req as any).user = decoded;
        next();

    }catch(err){
        return next(new HttpError("Invalid or expired access token",401))
    }

}