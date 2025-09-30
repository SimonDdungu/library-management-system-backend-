const express = require("express")
import { Request, Response } from "express"
import { controllers } from "../controllers"
import { sendErrorMessage, sendSuccessMessage } from "../common/response"


const router = express.Router()

router.get("/", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.users.getAllUsers(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})

router.get("/search", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.users.findActiveUser(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})

router.get("/search/inactive", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.users.findInactiveUser(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})

router.get("/search/nin", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.users.findByNIN(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})

router.get("/search/email", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.users.findByEmail(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})

router.get("/search/:id", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.users.findUser(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})






router.post("/create/", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.users.createUser(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})






router.put("/update/", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.users.updateUser(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})






router.put("/delete/many", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.users.deleteManyUsers(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})

router.delete("/delete/permanently/many", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.users.permanentlyDeleteManyUsers(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})

router.delete("/delete/permanently/:id", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.users.permanentlyDeleteUser(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})

router.put("/delete/:id", async (req: Request, res: Response) => {
    try {
        const data: any = await controllers.users.deleteUser(req)
        sendSuccessMessage(res, data)
    } catch (error: unknown) {
        sendErrorMessage(res, error)
    }
})


module.exports = router

