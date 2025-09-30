import { Request } from "express"
import { services } from '../services'
import { searchFilters } from "../interfaces";
import _ from "lodash";

const Joi = require('joi');



class BookController {
    async getAllBooks(filters?: searchFilters){
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
                publish_year: Joi.number().integer().required().max(4),
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

    async findBooks(req: Request, filters: searchFilters){
        try {
            const schema = Joi.object({
            query: Joi.string().required()
            })

            const payload = await schema.validateAsync(req.query)

            const {query} = payload
            const {page = 1, sortedBy = "createdAt", order = "desc"} = filters || {}

            return await services.books.findBooks(query, {page, sortedBy, order})
            
        } catch (error) {
            throw error
        }
    }

    async findBookTitle(req: Request, filters?: searchFilters){
        try {
            const schema = Joi.object({
            title: Joi.string().required()
            })

            const payload = await schema.validateAsync(req.query)

            const {title} = payload
            const {page = 1, sortedBy = "title", order = "asc"} = filters || {}

            return await services.books.findBookTitle(title, {page, sortedBy, order})
            
        } catch (error) {
            throw error
        }
    }

    async findBookAuthor(req: Request, filters: searchFilters){
        try {
            const schema = Joi.object({
            author: Joi.string().required()
            })

            const payload = await schema.validateAsync(req.query)

            const {author} = payload
            const {page = 1, sortedBy = "author", order = "asc"} = filters || {}

            return await services.books.findBookAuthor(author, {page, sortedBy, order})
            
        } catch (error) {
            throw error
        }
    }

    async findByYear(req: Request, filters: searchFilters){
        try {
            const schema = Joi.object({
            year: Joi.number().integer().required().max(4)
            })

            const payload = await schema.validateAsync(req.query)

            const {year} = payload
            const {page = 1, sortedBy = "author", order = "asc"} = filters || {}

            return await services.books.findByYear(year, {page, sortedBy, order})
            
        } catch (error) {
            throw error
        }
    }

    async findByISBN(req: Request){
        try {
            const schema = Joi.object({
            isbn: Joi.string().required()
            })

            const payload = await schema.validateAsync(req.query)

            const {isbn} = payload
    
            return await services.books.findByISBN(isbn)
            
        } catch (error) {
            throw error
        }
    }

    
    async updateOneBook(req: Request){
        try {
            const schema = Joi.object({
                id: Joi.string().required(),
                title: Joi.string().required(),
                author: Joi.string().required(),
                publish_year: Joi.number().integer().required().max(4),
                isbn_id: Joi.string().required(),
                new_isbn: Joi.string().required(),
            })

            const payload = await schema.validateAsync(req.body)

            if(payload.error == null){
                const {id, title, author, publish_year, isbn_id, new_isbn} = payload
                const Title = _.startCase(title)
                const Author = _.startCase(author)

                const exists = await services.books.findByISBN(new_isbn)

                if(exists){
                    throw new Error("Book with ISBN already exists")
                }else{
                    return await services.books.updateOneBook(id, Title, Author, publish_year, isbn_id, new_isbn)
                }
            } 
        } catch (error) {
            throw error
        }
    }


    async deleteOneBook(req: Request){
        try {
            const schema = Joi.object({
            id: Joi.string().required()
            })

            const payload = await schema.validateAsync(req.params)

            const {id} = payload
    
            return await services.books.deleteOneBook(id)

        } catch (error) {
            throw error
        }
    }

    async deleteManyBooks(req: Request){
        try {
            const schema = Joi.object({
            id: Joi.array().items(Joi.string())
            })

            const payload = await schema.validateAsync(req.body)

            const {id} = payload
    
            return await services.books.deleteManyBooks(id)

        } catch (error) {
            throw error
        }
    }
}

export { BookController }

