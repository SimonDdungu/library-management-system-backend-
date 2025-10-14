const express = require("express")
import { Request, Response } from "express"
import { controllers } from "../controllers"
import { handleErrorResponse, sendSuccessMessage } from "../common/response"
import { verifyToken } from "../middleware/auth"
import { authorized } from "../middleware/authorize"
import { isStaff, isAdmin, isLibrarian, isSuperAdmin } from "../middleware/auth"


const router = express.Router()

router.get("/", verifyToken, async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.getAllBooks(req)
        // authorized(isStaff)(req, res, () => {
        //     sendSuccessMessage(res, data)
        // });
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        handleErrorResponse(res, 500, error)
    }
})

router.get("/search", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.findBooks(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        handleErrorResponse(res, 500, error)
    }
})

router.get("/search/title", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.findBookTitle(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        handleErrorResponse(res, 500, error)
    }
})

router.get("/search/year", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.findByYear(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        handleErrorResponse(res, 500, error)
    }
})

router.get("/search/author", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.findBookAuthor(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        handleErrorResponse(res, 500, error)
    }
})

router.get("/search/isbn", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.findByISBN(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        handleErrorResponse(res, 500, error)
    }
})

router.get("/search/:id", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.findById(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        handleErrorResponse(res, 500, error)
    }
})






router.post("/create/", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.createBook(req, res)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        handleErrorResponse(res, 500, error)
    }
})






router.put("/update/", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.updateOneBook(req, res)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        handleErrorResponse(res, 500, error)
    }
})




router.delete("/delete/", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.deleteOneBook(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        handleErrorResponse(res, 500, error)
    }
})

router.post("/delete/book/", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.books.deleteManyBooks(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        handleErrorResponse(res, 500, error)
    }
})

module.exports = router

