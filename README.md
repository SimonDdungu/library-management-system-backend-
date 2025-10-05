## LIBRARY MANAGEMENT SYSTEM BACKEND
A backend system for managing library operations, allowing members to borrow and return books.
Keeps track of loans, due dates, and returns, recording which member has which book and when.
Provides full management of books, loans, and members to maintain an organized library system.

### Tech Stack
* Node.js
* TypeScript
* PostgreSQL
* Prisma
* Docker

### Prerequisites
[**Docker**](https://www.docker.com/)  

### Cloning Instructions (Use your Terminal to execute commands)
1. git clone https://github.com/SimonDdungu/library-management-system-backend-.git
2. cd library-management-system-backend-
3. cp .env.example .env (Edit .env file variables)
4. Start Docker daemon or Docker Desktop
5. docker compose down
4. docker compose up -d --build 
5. docker compose exec app npx prisma migrate deploy
6. docker compose exec app npx prisma db seed

> **BACKEND IS STILL IN EARLY DEVELOPMENT!!!**

This application was built by me to showcase my skills and add to my portfolio, not for commercial purposes. 
[My Portfolio](https://portfolio-v2-0-six.vercel.app/)