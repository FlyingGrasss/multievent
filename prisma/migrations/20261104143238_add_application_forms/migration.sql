-- CreateTable
CREATE TABLE "ApplicationForm" (
    "id" TEXT NOT NULL DEFAULT 'default',
    "titleTr" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descriptionTr" TEXT,
    "descriptionEn" TEXT,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationQuestion" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL DEFAULT 'default',
    "type" TEXT NOT NULL,
    "labelTr" TEXT NOT NULL,
    "labelEn" TEXT NOT NULL,
    "helpTr" TEXT,
    "helpEn" TEXT,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "options" JSONB,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ApplicationQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationSubmission" (
    "id" TEXT NOT NULL,
    "formId" TEXT NOT NULL DEFAULT 'default',
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "locale" TEXT NOT NULL DEFAULT 'tr',
    "submissionKey" TEXT,

    CONSTRAINT "ApplicationSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ApplicationAnswer" (
    "id" TEXT NOT NULL,
    "submissionId" TEXT NOT NULL,
    "questionId" TEXT,
    "questionLabelTr" TEXT NOT NULL,
    "questionLabelEn" TEXT NOT NULL,
    "questionType" TEXT NOT NULL,
    "value" JSONB NOT NULL,
    "displayTr" TEXT NOT NULL,
    "displayEn" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ApplicationAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ApplicationQuestion_formId_sortOrder_idx" ON "ApplicationQuestion"("formId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationSubmission_submissionKey_key" ON "ApplicationSubmission"("submissionKey");

-- CreateIndex
CREATE INDEX "ApplicationSubmission_formId_submittedAt_idx" ON "ApplicationSubmission"("formId", "submittedAt");

-- CreateIndex
CREATE INDEX "ApplicationAnswer_submissionId_sortOrder_idx" ON "ApplicationAnswer"("submissionId", "sortOrder");

-- CreateIndex
CREATE INDEX "ApplicationAnswer_questionId_idx" ON "ApplicationAnswer"("questionId");

-- AddForeignKey
ALTER TABLE "ApplicationQuestion" ADD CONSTRAINT "ApplicationQuestion_formId_fkey" FOREIGN KEY ("formId") REFERENCES "ApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationSubmission" ADD CONSTRAINT "ApplicationSubmission_formId_fkey" FOREIGN KEY ("formId") REFERENCES "ApplicationForm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApplicationAnswer" ADD CONSTRAINT "ApplicationAnswer_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "ApplicationSubmission"("id") ON DELETE CASCADE ON UPDATE CASCADE;
