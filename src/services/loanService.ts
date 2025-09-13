import prisma from "../database/model"
import _ from "lodash";

const limit = 20

class LoanService {
     async getAllLoans(page: number, sortBy: string = "createdAt", order: "asc" | "desc" = "desc"){
        try{
            const [loans, totalRecords] = await Promise.all([ 
                prisma.loan.findMany({
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: { [sortBy] : order },
                    include: { bookIsbn: true, user: true },
                }),
                prisma.loan.count()
            ])

            const totalPages = Math.ceil(totalRecords / limit);

            return { data: loans, totalRecords, totalPages,  page };

        }catch (err){
            throw new Error("Failed to fetch loans: " + (err as Error).message);
        }
    }

    async createLoan(userId: string, isbnId: string, dueDate: Date){
        try {
            //Does User exist?
            const user = await prisma.user.findUnique({ where: { id: userId } });
            if (!user || !user.isActive) {
            throw new Error("User does not exist");
            }

            //Is book taken by another customer?
            const activeLoan = await prisma.loan.findFirst({
                where: { isbnId: isbnId, returnDate: null },
            });
            if (activeLoan) {
               throw new Error("This book copy is already loaned out");
            }

            const bookDetails = await prisma.bookIsbn.findUnique({
                where: { id: isbnId },
                include: { book: true },
            });

            if (!bookDetails) {
                throw new Error("Book details not found");
            }



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

    async findLoan(query: string, page: number = 1,  sortBy: string = "createdAt", order: "asc" | "desc" = "desc") {
        try {
           const [books, totalRecords] = await Promise.all([ 
                prisma.book.findMany({
                    where: {
                        OR: [
                        { title: { contains: query, mode: "insensitive" } },
                        { author: { contains: query, mode: "insensitive" } },
                        ],
                    },
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: { [sortBy]: order },
                    include: { bookIsbns: true },
                }),
                prisma.book.count({
                        where: {
                            OR: [
                            { title: { contains: query, mode: "insensitive" } },
                            { author: { contains: query, mode: "insensitive" } },
                            ],
                        },
                })
            ])


            const totalPages = Math.ceil(totalRecords / limit);

            return { data: books, totalRecords, totalPages,  page };

        } catch (err) {
            throw new Error("Failed to filter books: " + (err as Error).message);
        }
    }

    async findBookTitle(title: string, page: number = 1, sortBy: string = "title", order: "asc" | "desc" = "asc") {
        try {
           const [books, totalRecords] = await Promise.all([ 
                prisma.book.findMany({
                    where: {
                        title: {contains: title, mode: "insensitive"}
                    },
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: { [sortBy]: order },
                    include: { bookIsbns: true },
                }),
                prisma.book.count({
                    where: {
                        title: {contains: title, mode: "insensitive"}
                    },
                })
            ])

        const totalPages = Math.ceil(totalRecords / limit)

        return { data: books, totalRecords, totalPages,  page };

        } catch (err) {
            throw new Error("Failed to filter book titles: " + (err as Error).message);
        }
    }

    async findBookAuthor(author: string, page: number = 1, sortBy: string = "author", order: "asc" | "desc" = "asc") {
        try {
           const [Authors, totalRecords] =  await Promise.all([ 
                prisma.book.findMany({
                    where: {
                        author: {contains: author, mode: "insensitive"}
                    },
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: { [sortBy]: order },
                    include: { bookIsbns: true },
                }),
                prisma.book.count({
                    where: {
                        author: {contains: author, mode: "insensitive"}
                    },
                })
            ])

        const totalPages = Math.ceil(totalRecords / limit)

        return { data: Authors, totalRecords, totalPages,  page };

        } catch (err) {
            throw new Error("Failed to filter book authors: " + (err as Error).message);
        }
    }

    async findByYear(year: number, page: number = 1, sortBy: string = "title", order: "asc" | "desc" = "asc") {
        try {
            const [Years, totalRecords] = await Promise.all([ 
                prisma.book.findMany({
                    where: { published_year: year },
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: { [sortBy]: order },
                    include: { bookIsbns: true },
                }),
                prisma.book.count({
                     where: { published_year: year },
                })
            ])

            const totalPages = Math.ceil(totalRecords / limit)

            return { data: Years, totalRecords, totalPages,  page };
            
        } catch (err) {
            throw new Error("Failed to filter book years: " + (err as Error).message);
        }
    }

    async updateOneBook(id: string, title: string, author: string, published_year: number, isbnId: string, newIsbn: string) {
        try {
            await prisma.book.update({
            where: { id: id },
            data: {
                title: title,
                author: author,
                published_year: published_year,
                bookIsbns: {
                    update: {
                        where: { id: isbnId }, 
                        data: { isbn: newIsbn },
                    },
                },
            }})
        } catch (err) {
        throw new Error("Failed to update book: " + (err as Error).message);
        }
    }

    async deleteOneBook(id: string) {
        try {
            await prisma.book.delete({
                where: { id },
            });
        } catch (err) {
            throw new Error("Failed to delete book: " + (err as Error).message);
        }
    }


}

export {LoanService}