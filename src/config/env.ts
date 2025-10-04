import dotenv from "dotenv"
dotenv.config()

export const config = {
    port: Number(process.env.PORT) || 3008,
    db_url: process.env.DATABASE_URL,
    Access_Token_Secret: process.env.ACCESS_TOKEN_SECRET || "DefaultSecret",
    Refresh_Token_Secret: process.env.REFRESH_TOKEN_SECRET || "THATS_WHY_his_Thee_GOAT_7"
} 
