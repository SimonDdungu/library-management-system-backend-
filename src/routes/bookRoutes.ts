const express = require("express")
import { Request, Response } from "express"
import { controllers } from "../controllers"
import { sendErrorMessage, sendSuccessMessage } from "../common/response"


const router = express.Router()

router.get("/", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.getAllBooks(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})

router.get("/search", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.findBooks(req)
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

router.get("/search/year", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.findByYear(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})

router.get("/search/author", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.findBookAuthor(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})

router.get("/search/isbn", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.findByISBN(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})

router.get("/search/:id", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.findById(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})






router.post("/create/", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.createBook(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})






router.put("/update/", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.updateOneBook(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})




router.delete("/delete/", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.deleteOneBook(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})

router.post("/delete/book/", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.deleteManyBooks(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})

module.exports = router

