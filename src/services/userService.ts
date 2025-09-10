import prisma from "../database/model";

class UserService{
    async getAllUsers(){
        try{
            return await prisma.user.findMany({
                where: { isActive: true }, 
            });
        }catch (err){
            throw new Error("Failed to fetch users: " + (err as Error).message);
        }
    }

    async createUser(name: string, email: string, phoneNumber: string, NIN: number){
        try {
            await prisma.user.create({data: {name: name, email: email.toLowerCase(), phoneNumber: phoneNumber, NIN: NIN}})
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


    async findActiveUser(query: string) {
        try {
            return await prisma.user.findMany({
                where: {
                    isActive: true,
                    name: { contains: query, mode: "insensitive" } },
                },
            );
        } catch (err) {
            throw new Error("Failed to filter active users: " + (err as Error).message);
        }
    }

    async findInActiveUser(query: string) {
        try {
            return await prisma.user.findMany({
                where: {
                    isActive: false,
                    name: { contains: query, mode: "insensitive" } },
                },
            );
        } catch (err) {
            throw new Error("Failed to filter inactive users: " + (err as Error).message);
        }
    }

    async findByNIN(NIN: number) {
        try {
            return await prisma.user.findUnique({
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

    async updateUser(id: string, name: string, email: string, phoneNumber: string, NIN: number){
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