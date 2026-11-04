-- CreateTable
CREATE TABLE "FestivalPage" (
    "id" TEXT NOT NULL DEFAULT 'forte',
    "content" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FestivalPage_pkey" PRIMARY KEY ("id")
);
