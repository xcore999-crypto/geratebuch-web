-- CreateTable
CREATE TABLE "technology_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nameDe" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "icon" TEXT NOT NULL DEFAULT 'layers',
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "technologies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "categoryId" TEXT NOT NULL,
    "nameDe" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "shortName" TEXT,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "synonyms" TEXT,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "technologies_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "technology_categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "manufacturers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "normalizedName" TEXT NOT NULL,
    "website" TEXT,
    "country" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "mergedIntoId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "device_models" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "manufacturerId" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "normalizedName" TEXT NOT NULL,
    "alternativeNames" TEXT,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "device_models_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "manufacturers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "device_model_technologies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deviceModelId" TEXT NOT NULL,
    "technologyId" TEXT NOT NULL,
    CONSTRAINT "device_model_technologies_deviceModelId_fkey" FOREIGN KEY ("deviceModelId") REFERENCES "device_models" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "device_model_technologies_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "technologies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "organizations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "customerSince" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "locations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "locations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "devices" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "organizationId" TEXT NOT NULL,
    "locationId" TEXT,
    "manufacturerId" TEXT,
    "deviceModelId" TEXT,
    "customManufacturer" TEXT,
    "customModel" TEXT,
    "serialNumber" TEXT NOT NULL,
    "productionYear" INTEGER,
    "purchaseDate" DATETIME,
    "commissioningDate" DATETIME,
    "devicePhotoUrl" TEXT,
    "typenschildPhotoUrl" TEXT,
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ok',
    "catalogReviewRequired" BOOLEAN NOT NULL DEFAULT false,
    "classificationStatus" TEXT NOT NULL DEFAULT 'not_reviewed',
    "classificationNote" TEXT,
    "lastServiceDate" DATETIME,
    "lastServiceType" TEXT,
    "nextServiceDate" DATETIME,
    "nextServiceReason" TEXT,
    "registeredAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "devices_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "devices_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "devices_manufacturerId_fkey" FOREIGN KEY ("manufacturerId") REFERENCES "manufacturers" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "devices_deviceModelId_fkey" FOREIGN KEY ("deviceModelId") REFERENCES "device_models" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "device_technologies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deviceId" TEXT NOT NULL,
    "technologyId" TEXT NOT NULL,
    CONSTRAINT "device_technologies_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "device_technologies_technologyId_fkey" FOREIGN KEY ("technologyId") REFERENCES "technologies" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "history_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deviceId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "technician" TEXT NOT NULL,
    "documentId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "history_events_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "history_events_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documents" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deviceId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "fileSize" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "documents_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "service_requests" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "publicId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "serviceSlug" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'erhalten',
    "description" TEXT NOT NULL,
    "deviceSnapshotName" TEXT NOT NULL,
    "scheduledDate" DATETIME,
    "lastUpdate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastUpdateNote" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "service_requests_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organizations" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "service_requests_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "devices" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "technology_categories_slug_key" ON "technology_categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "technologies_slug_key" ON "technologies"("slug");

-- CreateIndex
CREATE INDEX "technologies_categoryId_idx" ON "technologies"("categoryId");

-- CreateIndex
CREATE UNIQUE INDEX "manufacturers_normalizedName_key" ON "manufacturers"("normalizedName");

-- CreateIndex
CREATE UNIQUE INDEX "device_models_manufacturerId_normalizedName_key" ON "device_models"("manufacturerId", "normalizedName");

-- CreateIndex
CREATE UNIQUE INDEX "device_model_technologies_deviceModelId_technologyId_key" ON "device_model_technologies"("deviceModelId", "technologyId");

-- CreateIndex
CREATE INDEX "devices_organizationId_idx" ON "devices"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "device_technologies_deviceId_technologyId_key" ON "device_technologies"("deviceId", "technologyId");

-- CreateIndex
CREATE UNIQUE INDEX "history_events_documentId_key" ON "history_events"("documentId");

-- CreateIndex
CREATE INDEX "history_events_deviceId_idx" ON "history_events"("deviceId");

-- CreateIndex
CREATE INDEX "documents_deviceId_idx" ON "documents"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "service_requests_publicId_key" ON "service_requests"("publicId");

-- CreateIndex
CREATE INDEX "service_requests_organizationId_idx" ON "service_requests"("organizationId");

-- CreateIndex
CREATE INDEX "service_requests_deviceId_idx" ON "service_requests"("deviceId");
