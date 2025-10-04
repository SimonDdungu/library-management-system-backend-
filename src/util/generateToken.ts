import jwt from "jsonwebtoken"
import { config } from "../config/env"


export const generateToken = (payload: object) => {
    const secret = config.Jwt_Secret

    const token = jwt.sign(payload, secret, { expiresIn: "1h"})

    console.log(`JWT Token: ${token}`)

    return token
}
