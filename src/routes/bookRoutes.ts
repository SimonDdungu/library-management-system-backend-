const express = require("express")
import { Request, Response } from "express"
import { controllers } from "../controllers"
import { sendErrorMessage, sendSuccessMessage } from "../common/response"


const router = express.Router()

router.get("/", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.getAllBooks()
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})

router.get("/search/title", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.findBookTitle(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})


router.post("/createbook", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.createBook(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})

router.put("/update/book/", async (req: Request, res: Response) => {
    try {
        //const data: any = await controllers.ussd.updateUSSD(req)
        
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})

router.delete("/delete/book/", async (req: Request, res: Response) => {
    try {
        //const data: any = await controllers.ussd.deleteUSSD(req)
        
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})

module.exports = router

