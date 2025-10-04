import { Request, Response, NextFunction } from "express";

export const authorized = (policy: any, resource?: any) => (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user

    if(policy(user)){
        return next()
    }else {
        return res.status(403).json({status: 403, message: "Access Denied"})
    }
}