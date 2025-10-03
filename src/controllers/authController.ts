import { Request, Response } from "express"
import { services } from '../services'
import _ from "lodash";
import bcrypt from "bcrypt";

const Joi = require('joi');

const passwordSalt: any = process.env.PASSWORD_SALT

class AuthController {
    async createAdmin(req: Request, res: Response){
        try{
            const schema = Joi.object({
                name: Joi.string().required().min(3),
                email: Joi.email().string().required().lowercase(),
                phoneNumber: Joi.string().required().min(8),
                password: Joi.string().required().min(8).pattern(/[a-z]/, "lowercase").pattern(/[A-Z]/, "UPPERCASE").pattern(/[0-9]/, "number"),
                position: Joi.number().integer().required().max(1)
            })

            const payload = await schema.validateAsync(req.body)

            if(payload.error == null){
                const {name, email, phoneNumber, password, position = 1} = payload

                const email_exists = await services.admin.findByEmail(email)
                const phoneNumber_exists = await services.admin.findByPhoneNumber(phoneNumber)

                if(email_exists){
                     return res.status(409).json({ message: "Admin with email already exists"})
                }else if(phoneNumber_exists){
                     return res.status(409).json({ message: "Admin with phone number already exists"})
                }else{
                    const hashed_password = await bcrypt.hash(password, passwordSalt);
                    return await services.admin.createAdmin(name, email, phoneNumber, hashed_password, position)
                }
            }
        }catch(error){
            res.status(500).json({status: 500, message: (error as Error).message})
        }
    }

    async Login(req: Request, res: Response){
        try {
            const schema = Joi.object({
                email: Joi.string().email().required().lowercase(),
                password: Joi.string().min(8).pattern(/[a-z]/, "lowercase").pattern(/[A-Z]/, "UPPERCASE").pattern(/[0-9]/, "numbers"),
            })

            const payload = await schema.validateAsync(req.body) 

            if(payload.error == null){
                const {email, password} = payload

                const admin = await services.admin.loginAdmin(email)

                if(!admin){
                    res.status(401).json({ message: "Incorrect Email" });
                }else{
                    const isPasswordValid = await bcrypt.compare(password, admin.password);

                    if(!isPasswordValid){
                        res.status(401).json({ message: "Incorrect Password" });
                    }
                }

            return admin
        }
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
    
            return await services.admin.findByEmail(email)
            
        } catch (error) {
            throw error
        }
    }

    async findByPhoneNumber(req: Request){
        try {
            const schema = Joi.object({
            phoneNumber: Joi.string().min(8).required()
            })

            const payload = await schema.validateAsync(req.query)

            const {phoneNumber} = payload
    
            return await services.admin.findByPhoneNumber(phoneNumber)
        
        } catch (error) {
            throw error
        }
    }

    async findByPosition(req: Request){
        try {
            const schema = Joi.object({
                position: Joi.number().max(1)
            })

            const payload = await schema.validateAsync(req.query)

            const {position} = payload
    
            return await services.admin.findByPhoneNumber(position)
        
        } catch (error) {
            throw error
        }
    }

    async updateAdmin(req: Request, res: Response){
        try {
            const schema = Joi.object({
                id: Joi.string().required(),
                name: Joi.string().required().min(3),
                email: Joi.email().string().required().lowercase(),
                phoneNumber: Joi.string().required().min(8),
                position: Joi.number().integer().required().max(1),
                status: Joi.boolean()
            })


            const payload = await schema.validateAsync(req.body)

            if(payload.error == null){
                const {id, name, email, phoneNumber, position = 1, status = true} = payload

                const email_exists = await services.admin.findByEmail(email)
                const phoneNumber_exists = await services.admin.findByPhoneNumber(phoneNumber)

                if(email_exists){
                     return res.status(409).json({ message: "Admin with email already exists"})
                }else if(phoneNumber_exists){
                     return res.status(409).json({ message: "Admin with phone number already exists"})
                }else{
                    return await services.admin.updateAdmin(id, name, email, phoneNumber, position, status)
                }
            }
        } catch (error) {
            throw error
        }
    }

    async updatePassword(req: Request, res: Response){
        const schema = Joi.object({
                id: Joi.string().required(),
                password: Joi.string().required().min(8).pattern(/[a-z]/, "lowercase").pattern(/[A-Z]/, "UPPERCASE").pattern(/[0-9]/, "number"),
        })


        const payload = await schema.validateAsync(req.body)

        if(payload.error == null){ 
            const {id, password} = payload

            const hashed_password = await bcrypt.hash(password, passwordSalt);

            return await services.admin.updateAdminPassword(id, hashed_password)
        }
        
    }


    async deleteAdmin(req: Request){
        try {
            const schema = Joi.object({
            id: Joi.string().required()
            })

            const payload = await schema.validateAsync(req.params)

            const {id} = payload
    
            return await services.admin.deleteOneAdmin(id)
        } catch (error) {
            throw error
        }
    }

    async deleteManyAdmins(req: Request){
        try {
            const schema = Joi.object({
            id: Joi.array().items(Joi.string())
            })

            const payload = await schema.validateAsync(req.body)

            const {id} = payload
    
            return await services.admin.deleteManyAdmins(id)

        } catch (error) {
            throw error
        }
    }
}

export {AuthController}