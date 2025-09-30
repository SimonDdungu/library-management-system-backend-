import prisma from "../database/model";
import { searchFilters } from "../interfaces";
import _ from "lodash";

const limit = 20

class UserService{
    async getAllUsers(filters: any){
        try{
            const {page, sortBy, order} = filters
            const [users, totalRecords] = await Promise.all([ 
                prisma.user.findMany({
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: { [sortBy] : order },
                }),
                prisma.user.count()
            ])

            const totalPages = Math.ceil(totalRecords / limit);

            return { data: users, totalRecords, totalPages,  page };

        }catch (err){
            throw new Error("Failed to fetch users: " + (err as Error).message);
        }
    }

    async createUser(name: string, email: string, phoneNumber: string, NIN: string){
        try {
            await prisma.user.create({data: {name: _.startCase(_.toLower(name)), email: email.toLowerCase(), phoneNumber: phoneNumber, NIN: NIN}})
        } catch (err) {
            throw new Error("Failed to create user: " + (err as Error).message)
        }
    }

    async findUser(id: string) {
        try {
            return await prisma.user.findUnique({
                where: {
                    id: id
                },
            });
        } catch (err) {
            throw new Error("Failed to filter this user: " + (err as Error).message);
        }
    }


    async findActiveUser(name: string, filters: any) {
        try {
            const {page, sortedBy, order} = filters
            const [users, totalRecords] = await Promise.all([
                prisma.user.findMany({
                    where: {
                        isActive: true,
                        name: { contains: name, mode: "insensitive" } 
                    },
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: { [sortedBy] : order },
                }),
                prisma.user.count({
                    where: {
                        isActive: true,
                        name: { contains: name, mode: "insensitive" } 
                    },
                })
            ])

            const totalPages = Math.ceil(totalRecords / limit);

            return { data: users, totalRecords, totalPages,  page };

        } catch (err) {
            throw new Error("Failed to filter active users: " + (err as Error).message);
        }
    }

    async findInActiveUser(name: string, filters: any) {
        try {
            const {page, sortedBy, order} = filters
            const [users, totalRecords] = await Promise.all([
                prisma.user.findMany({
                    where: {
                        isActive: false,
                        name: { contains: name, mode: "insensitive" } },
                    },
                ),
                prisma.user.count({
                    where: {
                        isActive: false,
                        name: { contains: name, mode: "insensitive" } 
                    },
                })
            ]) 

            const totalPages = Math.ceil(totalRecords / limit);

            return { data: users, totalRecords, totalPages,  page };
        } catch (err) {
            throw new Error("Failed to filter inactive users: " + (err as Error).message);
        }
    }

    async findByNIN(NIN: string) {
        try {
            return await prisma.user.findFirst({
                where: {
                    NIN: NIN,
                },
            });
        } catch (err) {
            throw new Error("Failed to filter by NIN: " + (err as Error).message);
        }
    }

    async findByEmail(email: string) {
        try {
            return await prisma.user.findFirst({
                where: {
                    email: {equals: email, mode: "insensitive"},
                },
            });
        } catch (err) {
            throw new Error("Failed to filter by NIN: " + (err as Error).message);
        }
    }

    async findByPhoneNumber(phoneNumber: string) {
        try {
            return await prisma.user.findFirst({
                where: {
                    phoneNumber: {equals: phoneNumber, mode: "insensitive"},
                },
            });
        } catch (err) {
            throw new Error("Failed to filter by Phone Number: " + (err as Error).message);
        }
    }

    async updateUser(id: string, name: string, email: string, phoneNumber: string, NIN: string){
        try {
            await prisma.user.update({
                where: {id: id},
                data: {name: name, email: email.toLowerCase(), phoneNumber: phoneNumber, NIN: NIN}
            })
        } catch (err) {
            throw new Error("Failed to update User: " + (err as Error).message);
        }
    }

    async deleteUser(id: string) {
        try {
            await prisma.user.update({
                where: { id: id },
                data: {isActive: false}
            });
        } catch (err) {
            throw new Error("Failed to delete User: " + (err as Error).message);
        }
    }

}

export {UserService}