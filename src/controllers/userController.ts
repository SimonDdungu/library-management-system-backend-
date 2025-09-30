import { Request } from "express"
import { services } from '../services'
import { searchFilters } from "../interfaces";
import _ from "lodash";

const Joi = require('joi');



class UserController {
    async getAllUsers(req: Request){
        try {
            //const {page = 1, sortedBy = "createdAt", order = "desc"} = filters || {}
            const {page = "1", sortedBy = "createdAt", order = "desc"} = req.query as searchFilters

            let currentPage = Number(page)

            return await services.users.getAllUsers({currentPage, sortedBy, order})
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
                    return await services.users.createUser(name, email, phoneNumber, NIN)
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

            const payload = await schema.validateAsync(req.query)

            const {id} = payload

            return await services.users.findUser(id)
            
        } catch (error) {
            throw error
        }
    }

    async findActiveUser(req: Request, filters?: searchFilters){
        try {
            const schema = Joi.object({
            name: Joi.string().required()
            })

            const payload = await schema.validateAsync(req.query)

            const {name} = payload
            //const {page = 1, sortedBy = "name", order = "asc"} = filters || {}
            const {page = "1", sortedBy = "createdAt", order = "desc"} = req.query as searchFilters

            let currentPage = Number(page)

            return await services.users.findActiveUser(name, {currentPage, sortedBy, order})
            
        } catch (error) {
            throw error
        }
    }

    async findInactiveUser(req: Request, filters?: searchFilters){
        try {
            const schema = Joi.object({
            name: Joi.string().required()
            })

            const payload = await schema.validateAsync(req.query)

            const {name} = payload
            //const {page = 1, sortedBy = "name", order = "asc"} = filters || {}
            const {page = "1", sortedBy = "createdAt", order = "desc"} = req.query as searchFilters

            let currentPage = Number(page)

            return await services.users.findInActiveUser(name, {currentPage, sortedBy, order})
            
        } catch (error) {
            throw error
        }
    }

    async findByNIN(req: Request){
        try {
            const schema = Joi.object({
            NIN: Joi.number().string().required()
            })

            const payload = await schema.validateAsync(req.query)

            const {NIN} = payload

            return await services.users.findByNIN(NIN)
            
        } catch (error) {
            throw error
        }
    }

    async findByEmail(req: Request){
        try {
            const schema = Joi.object({
            email: Joi.email().string().required()
            })

            const payload = await schema.validateAsync(req.query)

            const {email} = payload
    
            return await services.users.findByEmail(email)
            
        } catch (error) {
            throw error
        }
    }

    
    async updateUser(req: Request){
        try {
            const schema = Joi.object({
                id: Joi.string().required(),
                name: Joi.string().required(),
                email: Joi.email().string().required(),
                phoneNumber: Joi.string().required(),
                NIN: Joi.string().required(),
                status: Joi.boolean(),
            })

            const payload = await schema.validateAsync(req.body)

            if(payload.error == null){
                const {id, name, email, phoneNumber, NIN, status = true} = payload


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
                    return await services.users.updateUser(id, name, email, phoneNumber, NIN, status)
                }
            }
        } catch (error) {
            throw error
        }
    }


    async deleteUser(req: Request){
        try {
            const schema = Joi.object({
            id: Joi.string().required()
            })

            const payload = await schema.validateAsync(req.params)

            const {id} = payload
    
            return await services.users.deleteOneUser(id)

        } catch (error) {
            throw error
        }
    }

    async deleteManyUsers(req: Request){
        try {
            const schema = Joi.object({
            id: Joi.array().items(Joi.string())
            })

            const payload = await schema.validateAsync(req.body)

            const {id} = payload
    
            return await services.users.deleteManyUsers(id)

        } catch (error) {
            throw error
        }
    }


    async permanentlyDeleteUser(req: Request){
        try {
            const schema = Joi.object({
            id: Joi.string().required()
            })

            const payload = await schema.validateAsync(req.params)

            const {id} = payload
    
            return await services.users.permanentlyDeleteOneUser(id)

        } catch (error) {
            throw error
        }
    }

    async permanentlyDeleteManyUsers(req: Request){
        try {
            const schema = Joi.object({
            id: Joi.array().items(Joi.string())
            })

            const payload = await schema.validateAsync(req.body)

            const {id} = payload
    
            return await services.users.permanentlydeleteManyUsers(id)

        } catch (error) {
            throw error
        }
    }
}

export { UserController }

