-- CreateTable
CREATE TABLE "bucket" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "bucket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "bucketId" INTEGER NOT NULL,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_bucketId_fkey" FOREIGN KEY ("bucketId") REFERENCES "bucket"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
