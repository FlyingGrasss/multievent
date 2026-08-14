CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "titleTr" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "descriptionTr" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "venueTr" TEXT,
    "venueEn" TEXT,
    "eventDate" TIMESTAMP(3),
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "EventMedia" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EventMedia_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");
CREATE INDEX "Event_active_sortOrder_idx" ON "Event"("active", "sortOrder");
CREATE INDEX "EventMedia_eventId_sortOrder_idx" ON "EventMedia"("eventId", "sortOrder");

ALTER TABLE "EventMedia" ADD CONSTRAINT "EventMedia_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
