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



    async createLoan(userId: string, isbnId: string, bookDetails: any, dueDate: Date){
        try {
            //Does User exist?
            

            //Is book taken by another customer?
           

            //  book details


            return await prisma.loan.create({
                data: 
                {
                    userId: userId, 
                    isbnId: isbnId, 
                    dueDate: dueDate, 
                    bookTitle: bookDetails.book.title,
                    bookAuthor: bookDetails.book.author,
                    bookYear: bookDetails.book.published_year
                }});


        } catch (err) {
            throw new Error("Failed to create loan: " + (err as Error).message)
        }
    }

    async findLoan(query: string, filters: any) {
        try {
            const {currentPage, sortBy, order} = filters
            const [loan, totalRecords] = await Promise.all([ 
                prisma.loan.findMany({
                    where: {
                        user:{
                            is: { isActive: true, name: {contains: query, mode: "insensitive"}},
                        },
                    },
                include: {user: true, bookIsbn: {include: {book: true}}},
                skip: (currentPage - 1) * limit,
                take: limit,
                orderBy: { [sortBy]: order },
                }),

                prisma.loan.count({
                    where: {
                        user:{
                            is: { isActive: true,  name: {contains: query, mode: "insensitive"}}
                        },
                    },
                })
            ])


            const totalPages = Math.ceil(totalRecords / limit);

            return { data: loan, totalRecords, totalPages,  currentPage };

        } catch (err) {
            throw new Error("Failed to filter Loans: " + (err as Error).message);
        }
    }

    async getAllDeletedLoans(filters: any) {
        try {
            const {currentPage, sortBy, order} = filters
            const [loan, totalRecords] = await Promise.all([ 
                prisma.loan.findMany({
                    where: {
                        isActive: false,
                    },
                include: {user: true, bookIsbn: {include: {book: true}}},
                skip: (currentPage - 1) * limit,
                take: limit,
                orderBy: { [sortBy]: order },
                }),

                prisma.loan.count({
                    where: {
                        isActive: false
                    },
                })
            ])


            const totalPages = Math.ceil(totalRecords / limit);

            return { data: loan, totalRecords, totalPages,  currentPage };

        } catch (err) {
            throw new Error("Failed to filter Loans: " + (err as Error).message);
        }
    }

    async findDeletedLoan(query: string, filters: any) {
        try {
            const {currentPage, sortBy, order} = filters
            const [loan, totalRecords] = await Promise.all([ 
                prisma.loan.findMany({
                    where: {
                        isActive: false,
                        user:{
                            is: { isActive: true, name: {contains: query, mode: "insensitive"}},
                        },
                    },
                include: {user: true, bookIsbn: {include: {book: true}}},
                skip: (currentPage - 1) * limit,
                take: limit,
                orderBy: { [sortBy]: order },
                }),

                prisma.loan.count({
                    where: {
                        isActive: false,
                        user:{
                            is: { isActive: true,  name: {contains: query, mode: "insensitive"}}
                        },
                    },
                })
            ])


            const totalPages = Math.ceil(totalRecords / limit);

            return { data: loan, totalRecords, totalPages,  currentPage };

        } catch (err) {
            throw new Error("Failed to filter Loans: " + (err as Error).message);
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

   

   async isAvailable(isbn: string,){
        try {
            return await prisma.bookIsbn.findFirst({
                where: {
                    isbn: {contains: isbn, mode: "insensitive"},        
                    loans: { none: { returnDate: null } },
                },
                include: {book: true}
            });
        } catch (error) {
            throw new Error("Something went wrong")
        }
    }


    async booksOnLoan(){
        return await prisma.loan.count({
            where: {
                returnDate: null
            }
        })
    }

    async updateLoan(id: string, isbnId: string, returnDate: Date,) {
        try {
            return await prisma.loan.update({
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