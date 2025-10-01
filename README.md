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

### Cloning Instructions (In your Terminal)
1. git clone https://github.com/SimonDdungu/library-management-system-backend-.git
2. cd library-management-system-backend-
3. cp .env.example .env (Edit .env file variables)
4. docker build -t library-management-system-backend .
5. For MacOS or Linux  
docker run -p 3008:3008 --env-file .env -v $(pwd):/app -v /app/node_modules library-management-system-backend
6. For Windows Powershell / Vscode  
docker run -p 3008:3008 --env-file .env -v ${PWD}:/app -v /app/node_modules library-management-system-backend
7. For Windows CMD  
docker run -p 3008:3008 --env-file .env -v %cd%:/app -v /app/node_modules library-management-system-backend




### BACKEND IS STILL IN EARLY DEVELOPMENT!!!

This application was built by me to showcase my skills and add to my portfolio, not for commercial purposes. 
[My Portfolio](https://portfolio-v2-0-six.vercel.app/)