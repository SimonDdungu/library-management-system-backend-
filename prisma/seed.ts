import prisma from "../src/database/model";
import bcrypt from "bcrypt";
import { books } from "./booksTemplate";

async function main() {
    await prisma.roles.createMany({
        data: [
            { name: 'SUPER_ADMIN' },
            { name: 'ADMIN' },
            { name: 'LIBRARIAN' },
            { name: 'STAFF' },
        ],
        skipDuplicates: true,
    })


    await prisma.position.createMany({
        data: [
            { title: 'CEO', roleId: 1 }, 
            { title: 'IT Systems Officer', roleId: 1 },
            { title: 'Library Manager', roleId: 1 },
            { title: 'Chief Librarian', roleId: 2 },
            { title: 'Library Director', roleId: 2 }, 
            { title: 'Assistant Librarian', roleId: 3 },
            { title: 'Deputy Librarian', roleId: 3 },
            { title: 'Library Clerk', roleId: 4},
            { title: 'Secretary', roleId: 4},
        ],
        skipDuplicates: true,
    })

    const CEO = await prisma.position.findUnique({ where: { title: 'CEO' } })
    const IT_Systems_Officer = await prisma.position.findUnique({ where: { title: 'IT Systems Officer' } })
    const deputyLibrarian = await prisma.position.findUnique({ where: { title: 'Deputy Librarian' } })
    const libraryClerk = await prisma.position.findUnique({ where: { title: 'Library Clerk' } })
    const Secretary = await prisma.position.findUnique({ where: { title: 'Secretary' } })

    if (!CEO || !IT_Systems_Officer || !deputyLibrarian || !libraryClerk || !Secretary) {
        throw new Error("Something went wrong seeding Positions")
    }

    const password = await bcrypt.hash("password123", 10);


    await prisma.admin.createMany({
        data: [
            // 1 Super Admin
            {
                name: "Simon Ddungu",
                email: "ceo@library.com",
                phoneNumber: "1000000001",
                password,
                positionId: CEO.id,
            },
            // 2 Library Administrators
            {
                name: "Riley Richy",
                email: "systemsofficer@library.com",
                phoneNumber: "1000000002",
                password,
                positionId: IT_Systems_Officer.id,
            },
            {
                name: "Chief Librarian B",
                email: "libadmin@library.com",
                phoneNumber: "1000000003",
                password,
                positionId: IT_Systems_Officer.id,
            },
            // 2 Librarians
            {
                name: "Deputy Librarian A",
                email: "librarian1@library.com",
                phoneNumber: "1000000004",
                password,
                positionId: deputyLibrarian.id,
            },
            {
                name: "Deputy Librarian B",
                email: "librarian2@library.com",
                phoneNumber: "1000000005",
                password,
                positionId: deputyLibrarian.id,
            },
            // 5 Staff
            {
                name: "Staff Member 1",
                email: "staff1@library.com",
                phoneNumber: "1000000006",
                password,
                positionId: Secretary.id,
            },
            {
                name: "Staff Member 2",
                email: "staff2@library.com",
                phoneNumber: "1000000007",
                password,
                positionId: Secretary.id,
            },
            {
                name: "Staff Member 3",
                email: "staff3@library.com",
                phoneNumber: "1000000008",
                password,
                positionId: Secretary.id,
            },
            {
                name: "Staff Member 4",
                email: "staff4@library.com",
                phoneNumber: "1000000009",
                password,
                positionId: Secretary.id,
            },
            {
                name: "Staff Member 5",
                email: "staff5@library.com",
                phoneNumber: "1000000010",
                password,
                positionId: Secretary.id,
            },
        ],
        skipDuplicates: true,
  })

  for (const book of books) {
    await prisma.book.create({ data: book });
  }

  console.log("Seeding completed successfully")

}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })