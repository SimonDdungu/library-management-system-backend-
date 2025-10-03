import dotenv from "dotenv"
dotenv.config()

export const config = {
    port: Number(process.env.PORT) || 3008,
    db_url: process.env.DATABASE_URL,
    Jwt_Secret: process.env.JWT_SECRET || "DefaultSecret"
} 
