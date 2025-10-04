import { Request, Response, NextFunction } from "express";

export const authorized = (policy: any, resource?: any) => (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user

    if(policy(user)){
        return next()
    }else {
        return res.status(402).json({status: 402, message: "Access Denied"})
    }
}