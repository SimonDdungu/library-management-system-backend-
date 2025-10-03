#!/bin/sh

#Running the database Migrations
echo "Starting Prisma migrations..."
npx prisma migrate dev --name init || echo "[WARN] Migration failed, continuing..."

#Seeding the database
echo "Seeding database..."
npx prisma db seed || echo "[WARN] Seeding failed, continuing..."

echo "Done seeding!"

echo "[INFO] Starting dev server..."
exec npm run dev