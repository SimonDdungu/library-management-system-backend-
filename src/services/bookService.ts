import prisma from "../database/model"
import _ from "lodash";

const limit = 20

class BookService{
   
    async getAllBooks(page: number){
        try{
            const [books, totalRecords] = await Promise.all([ 
                prisma.book.findMany({
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: { createdAt: "desc" },
                    include: { bookIsbns: true },
                }),
                prisma.book.count()
            ])

            const totalPages = Math.ceil(totalRecords / limit);

            return { data: books, totalRecords, totalPages,  page };

        }catch (err){
            throw new Error("Failed to fetch books: " + (err as Error).message);
        }
    }

    async createBook(title: string, author: string, publish_year: number, isbn: string){
        try {
            await prisma.book.create({data: {title: title, author: _.startCase(_.toLower(author)), published_year: publish_year, bookIsbns: {create: {isbn: isbn}}}})
        } catch (err) {
            throw new Error("Failed to create books: " + (err as Error).message)
        }
    }

    async findBooks(query: string, page: number = 1) {
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
                    orderBy: { createdAt: "desc" },
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

    async findBookTitle(title: string, page: number = 1) {
        try {
           const [books, totalRecords] = await Promise.all([ 
                prisma.book.findMany({
                    where: {
                        title: {contains: title, mode: "insensitive"}
                    },
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: { title: "asc" },
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

    async findBookAuthor(author: string, page: number = 1) {
        try {
           const [Authors, totalRecords] =  await Promise.all([ 
                prisma.book.findMany({
                    where: {
                        author: {contains: author, mode: "insensitive"}
                    },
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: { author: "asc" },
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

    async findByYear(year: number, page: number = 1) {
        try {
            const [Years, totalRecords] = await Promise.all([ 
                prisma.book.findMany({
                    where: { published_year: year },
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: { title: "asc" },
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

export {BookService}