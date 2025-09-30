import { Request } from "express"
import { services } from '../services'
import { searchFilters } from "../interfaces";
import _ from "lodash";

const Joi = require('joi');



class UserController {
    async getAllUsers(filters: searchFilters){
        try {
            const {page = 1, sortedBy = "createdAt", order = "desc"} = filters || {}

            return await services.users.getAllUsers({page, sortedBy, order})
        } catch (error) {
            throw error
        }
    }
    
    async createUser(req: Request){
        try{
            const schema = Joi.object({
                name: Joi.string().required(),
                email: Joi.email().string().required(),
                phoneNumber: Joi.string().required(),
                NIN: Joi.string().required()
            })

            const payload = await schema.validateAsync(req.body)

            if(payload.error == null){
                const {name, email, phoneNumber, NIN} = payload

                const NIN_exists = await services.users.findByNIN(NIN)
                const email_exists = await services.users.findByEmail(email)
                const phoneNumber_exists = await services.users.findByNIN(phoneNumber)

                if(NIN_exists){
                    throw new Error("User with NIN already exists")
                }else if(email_exists){
                    throw new Error("User with email already exists")
                }else if(phoneNumber_exists){
                    throw new Error("User with phone number already exists")
                }else{
                    return await services.books.createBook(name, email, phoneNumber, NIN)
                }
            }
        }catch(error){
            throw error
        }
    }

    async findUser(req: Request){
        try {
            const schema = Joi.object({
            id: Joi.string().required()
            })

            const payload = await schema.validateAsync(req.body)

            const {id} = payload

            return await services.users.findUser(id)
            
        } catch (error) {
            throw error
        }
    }

    async findActiveUser(req: Request, filters: searchFilters){
        try {
            const schema = Joi.object({
            name: Joi.string().required()
            })

            const payload = await schema.validateAsync(req.body)

            const {name} = payload
            const {page = 1, sortedBy = "name", order = "asc"} = filters || {}

            return await services.users.findActiveUser(name, {page, sortedBy, order})
            
        } catch (error) {
            throw error
        }
    }

    async findInactiveUser(req: Request, filters: searchFilters){
        try {
            const schema = Joi.object({
            name: Joi.string().required()
            })

            const payload = await schema.validateAsync(req.body)

            const {name} = payload
            const {page = 1, sortedBy = "name", order = "asc"} = filters || {}

            return await services.users.findInActiveUser(name, {page, sortedBy, order})
            
        } catch (error) {
            throw error
        }
    }

    async findByYear(req: Request, filters: searchFilters){
        try {
            const schema = Joi.object({
            year: Joi.number().integer().required().max(4)
            })

            const payload = await schema.validateAsync(req.body)

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

            const payload = await schema.validateAsync(req.body)

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

            const payload = await schema.validateAsync(req.body)

            const {id} = payload
    
            return await services.books.deleteOneBook(id)

        } catch (error) {
            throw error
        }
    }
}

export { UserController }

