import prisma from "../database/model"

class BookService{
    async getAllBooks(){
        try{
            return await prisma.book.findMany({
                include: { bookIsbns: true },
            });
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

    async findBooks(query: string) {
        try {
           return await prisma.book.findMany({
                where: {
                    OR: [
                    { title: { contains: query, mode: "insensitive" } },
                    { author: { contains: query, mode: "insensitive" } },
                    ],
                },
                include: { bookIsbns: true },
            });
        } catch (err) {
            throw new Error("Failed to filter books: " + (err as Error).message);
        }
    }

    async findBookTitle(title: string) {
        try {
           return await prisma.book.findMany({
                where: {
                   title: {contains: title, mode: "insensitive"}
                },
                include: { bookIsbns: true },
            });
        } catch (err) {
            throw new Error("Failed to filter book titles: " + (err as Error).message);
        }
    }

    async findBookAuthor(author: string) {
        try {
           return await prisma.book.findMany({
                where: {
                   author: {contains: author, mode: "insensitive"}
                },
                include: { bookIsbns: true },
            });
        } catch (err) {
            throw new Error("Failed to filter book authors: " + (err as Error).message);
        }
    }

    async findByYear(year: number) {
        try {
            return prisma.book.findMany({
                where: { published_year: year },
                include: { bookIsbns: true },
            });
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