import prisma from "../database/model"
import _ from "lodash";

const limit = 20

class LoanService {
     async getAllLoans(filters: any){
        try{
            const {currentPage, sortBy, order} = filters
            const [loans, totalRecords] = await Promise.all([ 
                prisma.loan.findMany({
                    where: {
                        user: {
                            is: {isActive: true}
                        }
                    },
                    include: {user: true, bookIsbn: {include: {book: true}}},
                    skip: (currentPage - 1) * limit,
                    take: limit,
                    orderBy: { [sortBy] : order },
                }),
                prisma.loan.count({
                    where: {
                        user: {
                            is: {isActive: true}
                        }
                    },
                })
            ])

            const totalPages = Math.ceil(totalRecords / limit);

            return { data: loans, totalRecords, totalPages,  currentPage };

        }catch (err){
            throw new Error("Failed to fetch loans: " + (err as Error).message);
        }
    }

    async getAllDeletedLoans(filters: any){
        try{
            const {currentPage, sortBy, order} = filters
            const [loans, totalRecords] = await Promise.all([ 
                prisma.loan.findMany({
                    where: {
                        user: {
                            is: {isActive: false}
                        }
                    },
                    include: {user: true, bookIsbn: {include: {book: true}}},
                    skip: (currentPage - 1) * limit,
                    take: limit,
                    orderBy: { [sortBy] : order },
                }),
                prisma.loan.count({
                    where: {
                        user: {
                            is: {isActive: false}
                        }
                    },
                })
            ])

            const totalPages = Math.ceil(totalRecords / limit);

            return { data: loans, totalRecords, totalPages,  currentPage };

        }catch (err){
            throw new Error("Failed to fetch loans: " + (err as Error).message);
        }
    }


    async createLoan(userId: string, isbn: string, dueDate: Date){
        try {
            //Does User exist?
            const user = await prisma.user.findUnique({ where: { id: userId } });
            if (!user || !user.isActive) {
            throw new Error("User does not exist");
            }

            //Is book taken by another customer?
           const isAvailable = await prisma.bookIsbn.findFirst({
                where: {
                    isbn: {contains: isbn, mode: "insensitive"},        
                    loans: { none: { returnDate: null } },
                }
            });
            if (!isAvailable) {
                throw new Error("This book is not available.");
            }

            const bookDetails = await prisma.bookIsbn.findUnique({
                where: { id: isAvailable.id },
                include: { book: true },
            });
            if (!bookDetails) {
                throw new Error("Book details not found");
            }



            return await prisma.loan.create({
                data: 
                {
                    userId: userId, 
                    isbnId: bookDetails.id, 
                    dueDate: dueDate, 
                    bookTitle: bookDetails.book.title,
                    bookAuthor: bookDetails.book.author,
                    bookYear: bookDetails.book.published_year
                }});


        } catch (err) {
            throw new Error("Failed to create loan: " + (err as Error).message)
        }
    }

    async findLoanSuccess(filters: any) {
        try {
            const {currentPage, sortBy, order} = filters
            const [loan, totalRecords] = await Promise.all([ 
                prisma.loan.findMany({
                    where: {
                        user:{
                            is: { isActive: true}
                        },
                        statusId: 1,
                    },
                include: {user: true, bookIsbn: {include: {book: true}}},
                skip: (currentPage - 1) * limit,
                take: limit,
                orderBy: { [sortBy]: order },
                }),

                prisma.loan.count({
                    where: {
                        user:{
                            is: { isActive: true}
                        },
                        statusId: 1 
                    },
                })
            ])


            const totalPages = Math.ceil(totalRecords / limit);

            return { data: loan, totalRecords, totalPages,  currentPage };

        } catch (err) {
            throw new Error("Failed to filter Loans: " + (err as Error).message);
        }
    }

    async findLoanPending(filters: any) {
        try {
            const {currentPage, sortBy, order} = filters
            const [loan, totalRecords] = await Promise.all([ 
                prisma.loan.findMany({
                    where: {
                        user:{
                            is: { isActive: true}
                        },
                        statusId: 2
                    },
                    include: {user: true, bookIsbn: {include: {book: true}}},
                    skip: (currentPage - 1) * limit,
                    take: limit,
                    orderBy: { [sortBy]: order },
                }),

                prisma.loan.count({
                    where: {
                        user:{
                            is: { isActive: true}
                        },
                        statusId: 2
                    },
                })
            ])


            const totalPages = Math.ceil(totalRecords / limit);

            return { data: loan, totalRecords, totalPages,  currentPage };

        } catch (err) {
            throw new Error("Failed to filter Loans: " + (err as Error).message);
        }
    }

    async findLoanFailed(filters: any) {
        try {
            const {currentPage, sortBy, order} = filters
            const [loan, totalRecords] = await Promise.all([ 
                prisma.loan.findMany({
                    where: {
                        user:{
                            is: { isActive: true}
                        },
                        statusId: 3
                    },
                    include: {user: true, bookIsbn: {include: {book: true}}},
                    skip: (currentPage - 1) * limit,
                    take: limit,
                    orderBy: { [sortBy]: order },
                }),

                prisma.loan.count({
                    where: {
                        user:{
                            is: { isActive: true}
                        },
                        statusId: 3
                    },
                })
            ])


            const totalPages = Math.ceil(totalRecords / limit);

            return { data: loan, totalRecords, totalPages,  currentPage };

        } catch (err) {
            throw new Error("Failed to filter Loans: " + (err as Error).message);
        }
    }

   

   

    async updateLoan(id: string, returnDate: Date, isbnId: string,) {
        try {
            await prisma.loan.update({
            where: { id: id },
            data: {
                isbnId: isbnId,
                returnDate: returnDate,
            }})
        } catch (err) {
        throw new Error("Failed to update Loan: " + (err as Error).message);
        }
    }

    async deleteLoan(id: string) {
        try {
            await prisma.loan.update({
                where: { id },
                data: {isActive: false}
            });
        } catch (err) {
            throw new Error("Failed to delete loan: " + (err as Error).message);
        }
    }

    async restoreLoan(id: string) {
        try {
            await prisma.loan.update({
                where: { id },
                data: {isActive: true}
            });
        } catch (err) {
            throw new Error("Failed to restore loan: " + (err as Error).message);
        }
    }

    async permanentlyDeleteLoan(id: string) {
        try {
            await prisma.loan.delete({
                where: { id },
            });
        } catch (err) {
            throw new Error("Failed to delete loan: " + (err as Error).message);
        }
    }


}

export {LoanService}