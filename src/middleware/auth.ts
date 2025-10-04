import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { config } from "../config/env";
import { services } from "../services";

interface UserAccess {
    id: string,
}

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



export const isStaff = async(user: UserAccess) => {
    const validUser = await services.admin.findById(user.id)

    if (!validUser){
        throw new Error("User not found")
    } 

    return (
        (validUser.position.roleId >= 1 && validUser.position.roleId <= 4)
    )
}

export const isLibrarian = async(user: UserAccess) => {
   const validUser = await services.admin.findById(user.id)

    if (!validUser){
        throw new Error("User not found")
    } 

    return (
        (validUser.position.roleId >= 1 && validUser.position.roleId <= 3)
    )
}

export const isAdmin = async(user: UserAccess) => {
    const validUser = await services.admin.findById(user.id)

    if (!validUser){
        throw new Error("User not found")
    } 

    return (
        (validUser.position.roleId >= 1 && validUser.position.roleId <= 2)
    )
}

export const isSuperAdmin = async(user: UserAccess) => {
    const validUser = await services.admin.findById(user.id)

    if (!validUser){
        throw new Error("User not found")
    } 

    return (
        validUser.position.roleId === 1
    )
}