import { Request, Response, NextFunction } from "express";

const errorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
   if (err instanceof Error) {
        console.error(err.stack);

        res.status(500).json({status: 500, message: "Internal Server Error", error: err.message})

    }else {
        // fallback
        console.error(err);

        res.status(500).json({ status: 500, message: "Internal Server Error", error: err });
    }

}

export default errorHandler