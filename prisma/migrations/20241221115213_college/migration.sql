-- CreateTable
CREATE TABLE "College" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "score" INTEGER NOT NULL,
    "cityId" INTEGER NOT NULL,
    "stateId" INTEGER NOT NULL,

    CONSTRAINT "College_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollegePlacement" (
    "id" SERIAL NOT NULL,
    "collegeId" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "highestPlacement" DECIMAL(10,2) NOT NULL,
    "averagePlacement" DECIMAL(10,2) NOT NULL,
    "medianPlacement" DECIMAL(10,2) NOT NULL,
    "placementRate" DECIMAL(5,2) NOT NULL,

    CONSTRAINT "CollegePlacement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollegeWiseCourse" (
    "id" SERIAL NOT NULL,
    "collegeId" INTEGER NOT NULL,
    "courseName" VARCHAR(255) NOT NULL,
    "courseDuration" INTEGER NOT NULL,
    "courseFee" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "CollegeWiseCourse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "States" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "States_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "stateId" INTEGER NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "College_score_idx" ON "College"("score" DESC);

-- CreateIndex
CREATE INDEX "College_cityId_idx" ON "College"("cityId");

-- CreateIndex
CREATE INDEX "College_stateId_idx" ON "College"("stateId");

-- CreateIndex
CREATE INDEX "CollegePlacement_collegeId_idx" ON "CollegePlacement"("collegeId");

-- CreateIndex
CREATE INDEX "CollegePlacement_year_idx" ON "CollegePlacement"("year");

-- CreateIndex
CREATE INDEX "City_stateId_idx" ON "City"("stateId");

-- AddForeignKey
ALTER TABLE "College" ADD CONSTRAINT "College_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "College" ADD CONSTRAINT "College_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "States"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegePlacement" ADD CONSTRAINT "CollegePlacement_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CollegeWiseCourse" ADD CONSTRAINT "CollegeWiseCourse_collegeId_fkey" FOREIGN KEY ("collegeId") REFERENCES "College"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "States"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
