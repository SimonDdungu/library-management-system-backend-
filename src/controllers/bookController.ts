import { Request } from "express"
import { services } from '../services'
import _ from "lodash";

const Joi = require('joi');

class BookController {
    async getAllBooks(filters: {page?: number, sortedBy?: string, order?: "asc" | "desc"}){
        try {
            const {page = 1, sortedBy = "createdAt", order = "desc"} = filters || {}

            return await services.books.getAllBooks({page, sortedBy, order})
        } catch (error) {
            throw error
        }
    }

    async createBook(req: Request){
        try{
            const schema = Joi.object({
                title: Joi.string().required(),
                author: Joi.string().required(),
                publish_year: Joi.number().integer().required(),
                isbn: Joi.string().required()
            })

            const payload = await schema.validateAsync(req.body)

            if(payload.error == null){
                const {title, author, publish_year, isbn} = payload
                const Title = _.startCase(title)
                const Author = _.startCase(author)

                const exists = await services.books.findByISBN(isbn)

                if(exists){
                    throw new Error("Book with ISBN already exists")
                }else{
                    return await services.books.createBook(Title, Author, publish_year, isbn)
                }
            }
        }catch(error){
            throw error
        }
    }

    async findBooks(req: Request, filters: {page?: number, sortedBy?: string, order?: "asc" | "desc"}){
        try {
            const schema = Joi.object({
            query: Joi.string().required()
            })

            const payload = await schema.validateAsync(req.body)

            const {query} = payload
            const {page = 1, sortedBy = "createdAt", order = "desc"} = filters || {}

            return await services.books.findBooks(query, {page, sortedBy, order})
            
        } catch (error) {
            throw error
        }
        



    }
}

export { BookController }

