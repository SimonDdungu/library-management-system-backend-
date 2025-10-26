import { Request, Response } from "express"
import { services } from '../services'
import { searchFilters } from "../interfaces";
import _ from "lodash";

const Joi = require('joi');



class BookController {
    async getAllBooks(req: Request){
        try {
            //const {page = 1, sortedBy = "createdAt", order = "desc"} = filters || {}
            const {page = "1", sortedBy = "createdAt", order = "desc"} = req.query as searchFilters

            let currentPage = Number(page)

            return await services.books.getAllBooks({currentPage, sortedBy, order})
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async createBook(req: Request){
        try{
            const schema = Joi.object({
                title: Joi.string().required(),
                author: Joi.string().required(),
                publish_year: Joi.number().integer().required().max(9999),
                isbn: Joi.string().required()
            })

            

            const payload = await schema.validateAsync(req.body)

            console.log("Received data: ", payload)

            if(payload.error == null){
                const {title, author, publish_year, isbn} = payload
                const Title = _.startCase(title)
                const Author = _.startCase(author)

                const exists = await services.books.findByISBN(isbn)

                if(exists){
                    throw Object.assign(new Error("Book with ISBN already exists"), { statusCode: 409 });
                }else{
                    return await services.books.createBook(Title, Author, publish_year, isbn)
                }
            }
        }catch(error){
            throw error
        }
    }

    async findBooks(req: Request){
        try {
            const schema = Joi.object({
            query: Joi.string().required()
            })

            const payload = await schema.validateAsync(req.query)

            const {query} = payload
            //const {page = 1, sortedBy = "createdAt", order = "desc"} = filters || {}
            const {page = "1", sortedBy = "createdAt", order = "desc"} = req.query as searchFilters

            let currentPage = Number(page)
            

            return await services.books.findBooks(query, {currentPage, sortedBy, order})
            
        } catch (error) {
            throw error
        }
    }

    async findBookTitle(req: Request){
        try {
            const schema = Joi.object({
            title: Joi.string().required()
            })

            const validationOptions = {
                allowUnknown: true
            };

            
            const payload = await schema.validateAsync(req.query, validationOptions)

            const {title} = payload
            //const {page = 1, sortedBy = "title", order = "asc"} = filters || {}
            const {page = "1", sortedBy = "title", order = "asc"} = req.query as searchFilters

            let currentPage = Number(page)


            return await services.books.findBookTitle(title, {currentPage, sortedBy, order})
            
        } catch (error) {
            throw error
        }
    }

    async findBookAuthor(req: Request){
        try {
            const schema = Joi.object({
            author: Joi.string().required()
            })
            
            const validationOptions = {
               allowUnknown: true
            };

            const payload = await schema.validateAsync(req.query, validationOptions)


            const {author} = payload
            //const {page = 1, sortedBy = "author", order = "asc"} = filters || {}
            const {page = "1", sortedBy = "author", order = "asc"} = req.query as searchFilters

            let currentPage = Number(page)

            return await services.books.findBookAuthor(author, {currentPage, sortedBy, order})
            
        } catch (error) {
            throw error
        }
    }

    async findByYear(req: Request){
        try {
            const schema = Joi.object({
            Year: Joi.number().integer().required().max(9999)
            })

            const {year} = req.query
            let SearchedYear = Number(year)

            const payload = await schema.validateAsync({ Year: SearchedYear }, {allowUnknown: true})

            const {Year} = payload
            //const {page = 1, sortedBy = "year", order = "desc"} = filters || {}
            const {page = "1", sortedBy = "published_year", order = "desc"} = req.query as searchFilters

            let currentPage = Number(page)

            return await services.books.findByYear(Year, {currentPage, sortedBy, order})
            
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

    async findById(req: Request){
        try {
            const schema = Joi.object({
            id: Joi.string().required()
            })

            const payload = await schema.validateAsync(req.params)

            const {id} = payload
    
            return await services.books.findById(id)
            
        } catch (error) {
            throw error
        }
    }

    
    async updateOneBook(req: Request, res: Response){
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
                    return res.status(409).json({ message: "Book with ISBN already exists"})
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

