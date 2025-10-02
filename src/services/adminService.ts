import prisma from "../database/model";
import { searchFilters } from "../interfaces";
import _ from "lodash";

class AdminService {
    async createAdmin(name: string, email: string, phoneNumber: string, password: string, position: number){
        try {
            await prisma.admin.create({data: {name: _.startCase(_.toLower(name)), email: email.toLowerCase(), phoneNumber: phoneNumber, password: password, positionId: position}})
        } catch (err) {
            throw new Error("Failed to create Admin: " + (err as Error).message)
        }
    }

    async loginAdmin(email: string){
        try {
            return await prisma.admin.findFirst({
                    where: {
                        email: email
                    }
                });
        } catch (err) {
            throw new Error("Failed to login admin: " + (err as Error).message)
        }
    }

    async findByEmail(email: string) {
        try {
            return await prisma.admin.findFirst({
                where: {
                    email: {equals: email, mode: "insensitive"},
                },
            });
        } catch (err) {
            throw new Error("Failed to filter by Email: " + (err as Error).message);
        }
    }

    async findByPhoneNumber(phoneNumber: string) {
        try {
            return await prisma.admin.findFirst({
                where: {
                    phoneNumber: {equals: phoneNumber, mode: "insensitive"},
                },
            });
        } catch (err) {
            throw new Error("Failed to filter by Phone Number: " + (err as Error).message);
        }
    }

    async updateAdmin(id: string, name: string, email: string, phoneNumber: string, position: number, status: boolean){
        try {
            await prisma.admin.update({
                where: {id: id},
                data: {name: name, email: email.toLowerCase(), phoneNumber: phoneNumber, positionId: position, isActive: status}
            })
        } catch (err) {
            throw new Error("Failed to update Admin: " + (err as Error).message);
        }
    }

    async deleteOneAdmin(id: string) {
        try {
            await prisma.admin.update({
                where: { id: id },
                data: {isActive: false}
            });
        } catch (err) {
            throw new Error("Failed to delete Admin: " + (err as Error).message);
        }
    }

    async deleteManyAdmins(ids: string[]) {
        try {
            await prisma.admin.updateMany({
                where: { id: {in: ids} },
                data: {isActive: false}
            });
        } catch (err) {
            throw new Error("Failed to delete Many Admins: " + (err as Error).message);
        }
    }
}
export {AdminService}