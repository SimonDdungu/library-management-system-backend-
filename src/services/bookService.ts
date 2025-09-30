import prisma from "../database/model"

const limit = 20


class BookService{
   
    async getAllBooks(filters: any){
        try{
            const {page, sortBy, order} = filters
            const [books, totalRecords] = await Promise.all([ 
                prisma.book.findMany({
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: { [sortBy] : order },
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
            await prisma.book.create({data: {title: title, author: author, published_year: publish_year, bookIsbns: {create: {isbn: isbn}}}})
        } catch (err) {
            throw new Error("Failed to create books: " + (err as Error).message)
        }
    }

    async findBooks(query: string, filters: any) {
        try {
            const{page,  sortBy, order} = filters
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

    async findBookTitle(title: string, filters: any) {
        try {
            const{page,  sortBy, order} = filters
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

    async findBookAuthor(author: string, filters: any) {
        try {
            const{page,  sortBy, order} = filters
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

    async findByYear(year: number, filters: any) {
        try {
            const{page,  sortBy, order} = filters
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

    async findByISBN(isbn: string) {
        try {
            const ISBN = await prisma.bookIsbn.findFirst({
                    where: { isbn: {contains: isbn, mode: "insensitive"} },
                    include: { book: true },
                })

            return { data: ISBN};
            
        } catch (err) {
            throw new Error("Failed to find the book isbn: " + (err as Error).message);
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