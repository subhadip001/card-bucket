-- DropForeignKey
ALTER TABLE "card" DROP CONSTRAINT "card_bucketId_fkey";

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_bucketId_fkey" FOREIGN KEY ("bucketId") REFERENCES "bucket"("id") ON DELETE CASCADE ON UPDATE CASCADE;
