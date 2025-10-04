import jwt from "jsonwebtoken"
import { config } from "../config/env"
import { Request, Response } from "express"
import { controllers } from "../controllers"


export const generateAccessToken = (payload: object) => {
    const secret = config.Access_Token_Secret

    const token = jwt.sign(payload, secret, { expiresIn: "30s"})

    console.log(`New Access Token: ${token}`)

    return token
}

export const generateRefreshToken = (payload: object) => {
    const secret = config.Refresh_Token_Secret

    const token = jwt.sign(payload, secret, { expiresIn: "7d"})

    console.log(`New Refresh Token: ${token}`)

    return token
}

export const newAccessToken = async(req: Request, res: Response) => {
    const refreshToken = req.body.refreshToken
    const refreshSecret = config.Refresh_Token_Secret

    if (!refreshToken) {
        return res.status(401).json({ message: "No refresh token provided" });
    }

    try {
        const decoded: any = jwt.verify(refreshToken, refreshSecret);

        const user = await controllers.auth.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        const NewAccesstoken = generateAccessToken(user)
        const NewRefreshtoken = generateAccessToken(user)

        return {NewAccesstoken, NewRefreshtoken}

    } catch (err) {
        return res.status(401).json({ message: "Refresh token invalid or expired" });
    }
}
