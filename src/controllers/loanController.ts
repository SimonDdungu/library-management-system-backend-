import { Request, Response } from "express"
import { services } from '../services'
import { searchFilters } from "../interfaces";
import _ from "lodash";

const Joi = require('joi');



class LoanController {
    async getAllLoans(req: Request){
        try {
            
            const {page = "1", sortedBy = "createdAt", order = "desc"} = req.query as searchFilters

            let currentPage = Number(page)

            return await services.loans.getAllLoans({currentPage, sortedBy, order})
        } catch (error) {
            throw error
        }
    }

    async createLoan(req: Request, res: Response){
        try{
            const schema = Joi.object({
                userId: Joi.string().required(),
                isbn: Joi.string().required(),
                dueDate: Joi.date().iso()
            })

            const payload = await schema.validateAsync(req.body)

            if(payload.error == null){
                const {userId, isbn, dueDate} = payload

                const User_exists = await services.users.exists(userId)
                const is_BookAvailable = await services.loans.isAvailable(isbn)
                

                if(!User_exists){
                    return res.status(404).json({ message: "User doesn't exist"})
                }else if(!is_BookAvailable) {
                    return res.status(404).json({ message: "Book not available"})
                }else{
                    const bookDetails = await services.books.BookDetails(is_BookAvailable.id)
                   return await services.loans.createLoan(userId, isbn, bookDetails, dueDate)
                }
            }
        }catch(error){
            throw error
        }
    }

    async findLoan(req: Request){
        try {
            const schema = Joi.object({
            query: Joi.string().required()
            })

            const payload = await schema.validateAsync(req.query)

            const {query} = payload
            //const {page = 1, sortedBy = "createdAt", order = "desc"} = filters || {}
            const {page = "1", sortedBy = "createdAt", order = "desc"} = req.query as searchFilters

            let currentPage = Number(page)
            

            return await services.loans.findLoan(query, {currentPage, sortedBy, order})
            
        } catch (error) {
            throw error
        }
    }

    async findLoanSuccess(req: Request){
        try {

            //const {page = 1, sortedBy = "createdAt", order = "desc"} = filters || {}
            const {page = "1", sortedBy = "createdAt", order = "desc"} = req.query as searchFilters

            let currentPage = Number(page)
            

            return await services.loans.findLoanSuccess({currentPage, sortedBy, order})
            
        } catch (error) {
            throw error
        }
    }

    async findLoanPending(req: Request){
        try {

            //const {page = 1, sortedBy = "createdAt", order = "desc"} = filters || {}
            const {page = "1", sortedBy = "createdAt", order = "desc"} = req.query as searchFilters

            let currentPage = Number(page)
            

            return await services.loans.findLoanPending({currentPage, sortedBy, order})
            
        } catch (error) {
            throw error
        }
    }

    async findLoanFailed(req: Request){
        try {
            
            //const {page = 1, sortedBy = "createdAt", order = "desc"} = filters || {}
            const {page = "1", sortedBy = "createdAt", order = "desc"} = req.query as searchFilters

            let currentPage = Number(page)
            

            return await services.loans.findLoanFailed({currentPage, sortedBy, order})
            
        } catch (error) {
            throw error
        }
    }

    async findLoanDeleted(req: Request){
        try {
            const schema = Joi.object({
            query: Joi.string().required()
            })

            const payload = await schema.validateAsync(req.query)

            const {query} = payload
            //const {page = 1, sortedBy = "createdAt", order = "desc"} = filters || {}
            const {page = "1", sortedBy = "createdAt", order = "desc"} = req.query as searchFilters

            let currentPage = Number(page)
            

            return await services.loans.findDeletedLoan(query, {currentPage, sortedBy, order})
            
        } catch (error) {
            throw error
        }
    }

    
    async updateLoan(req: Request, res: Response){
        try {
            const schema = Joi.object({
                id: Joi.string().required(),
                isbn: Joi.string().required(),
                returnDate: Joi.date().iso()
            })

            const payload = await schema.validateAsync(req.body)

            if(payload.error == null){
                const {id, isbn, returnDate} = payload

                const is_BookAvailable = await services.loans.isAvailable(isbn)
                
                if(!is_BookAvailable) {
                    return res.status(404).json({ message: "Book not available"})
                }else{
                    const bookDetails = await services.books.BookDetails(is_BookAvailable.id)
                    const isbnId = bookDetails?.id
                    if(isbnId){
                        return await services.loans.updateLoan(id, isbnId, returnDate)
                    }else{
                        res.status(500).json({message: "Could not update Loan"})
                    }
                }
            }
        }catch (error) {
            throw error
        }
    }


    async deleteOneLoan(req: Request){
        try {
            const schema = Joi.object({
            id: Joi.string().required()
            })

            const payload = await schema.validateAsync(req.params)

            const {id} = payload
    
            return await services.loans.deleteLoan(id)

        } catch (error) {
            throw error
        }
    }

    async permanentlyDeleteOneLoan(req: Request){
        try {
            const schema = Joi.object({
            id: Joi.string().required()
            })

            const payload = await schema.validateAsync(req.params)

            const {id} = payload
    
            return await services.loans.permanentlyDeleteLoan(id)

        } catch (error) {
            throw error
        }
    }

}

export { LoanController }

