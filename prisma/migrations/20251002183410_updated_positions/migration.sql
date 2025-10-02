-- AlterTable
ALTER TABLE "public"."Admin" ALTER COLUMN "positionId" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "public"."Position" ALTER COLUMN "name" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Roles" ALTER COLUMN "name" DROP DEFAULT;
