import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "../config/env";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token;
    let authHeader = req.headers.authorization
    let jwtsecret = config.Jwt_Secret

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1]

        if(!token){
            return res.status(401).json({status: 401, message: "No Token, Authorization denied"})
        }

        try {
            const decode = jwt.verify(token, jwtsecret);
            (req as any).user = decode;
            next()
        } catch (error) {
            res.status(400).json({status: 400, message: "Token is not valid"})
        }
    } else {
        return res.status(401).json({status: 401, message: "No Token, Authorization denied"})
    }
}