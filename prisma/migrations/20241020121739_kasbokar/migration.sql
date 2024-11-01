-- CreateEnum
CREATE TYPE "FinancialType" AS ENUM ('COGS', 'EBITDA', 'REVENUES');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'SUPERADMIN', 'USER');

-- CreateTable
CREATE TABLE "Expertise" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pricePerHour" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expertise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpertiseBooking" (
    "id" TEXT NOT NULL,
    "bookedbyUserId" TEXT NOT NULL,
    "bookedbyUserName" TEXT NOT NULL,
    "expertiseId" TEXT NOT NULL,
    "expertiseName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ExpertiseBooking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blogs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Blogs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "oauthId" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "username" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Companies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuisnessPlan" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "BuisnessPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PitchDeck" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "PitchDeck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialForecast" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "FinancialForecast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RevenueAssumption" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pricePerUnit" DOUBLE PRECISION NOT NULL,
    "financialForecastId" TEXT NOT NULL,

    CONSTRAINT "RevenueAssumption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RevenueLAssumptionItems" (
    "id" TEXT NOT NULL,
    "unitName" TEXT NOT NULL,
    "FY1" DOUBLE PRECISION NOT NULL,
    "FY2" DOUBLE PRECISION NOT NULL,
    "FY3" DOUBLE PRECISION NOT NULL,
    "FY4" DOUBLE PRECISION NOT NULL,
    "FY5" DOUBLE PRECISION NOT NULL,
    "revenueAssumptionId" TEXT NOT NULL,

    CONSTRAINT "RevenueLAssumptionItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnnualFinancials" (
    "id" TEXT NOT NULL,
    "FY1" DOUBLE PRECISION NOT NULL,
    "FY2" DOUBLE PRECISION NOT NULL,
    "FY3" DOUBLE PRECISION NOT NULL,
    "FY4" DOUBLE PRECISION NOT NULL,
    "FY5" DOUBLE PRECISION NOT NULL,
    "type" "FinancialType" NOT NULL,
    "financialForecastId" TEXT NOT NULL,

    CONSTRAINT "AnnualFinancials_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExpenseAssumption" (
    "id" TEXT NOT NULL,
    "initialCapital" TEXT NOT NULL,
    "initialCapitalAssumptions" TEXT NOT NULL,
    "workingCapital" TEXT NOT NULL,
    "workingCapitalAssumptions" TEXT NOT NULL,
    "capitalExpenditure" TEXT NOT NULL,
    "capitalExpenditureAssumptions" TEXT NOT NULL,
    "financialForecastId" TEXT NOT NULL,

    CONSTRAINT "ExpenseAssumption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OperatingExpense" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "currency" TEXT NOT NULL,
    "growthRate" TEXT NOT NULL,
    "growthRateUnit" TEXT NOT NULL,
    "assumptions" TEXT NOT NULL,
    "expenseAssumptionId" TEXT NOT NULL,

    CONSTRAINT "OperatingExpense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExecutiveSummary" (
    "id" TEXT NOT NULL,
    "ProblemStateMent" TEXT NOT NULL,
    "ProposedSolution" TEXT NOT NULL,
    "ValueProposition" TEXT NOT NULL,
    "ThreeYearsObective" TEXT NOT NULL,
    "KeysToSuccess" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "buisnessplanId" TEXT NOT NULL,

    CONSTRAINT "ExecutiveSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitiveComparison" (
    "id" TEXT NOT NULL,
    "competitors" TEXT NOT NULL,
    "competitiveAdvantage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "buisnessplanId" TEXT NOT NULL,

    CONSTRAINT "CompetitiveComparison_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Strategy" (
    "id" TEXT NOT NULL,
    "managementTeam" TEXT NOT NULL,
    "swotAnalysis" TEXT NOT NULL,
    "pestleAnalysis" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "buisnessplanId" TEXT NOT NULL,

    CONSTRAINT "Strategy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IndustryOverview" (
    "id" TEXT NOT NULL,
    "industryDescription" TEXT NOT NULL,
    "marketNeeds" TEXT NOT NULL,
    "marketTrends" TEXT NOT NULL,
    "marketSegementation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "buisnessplanId" TEXT NOT NULL,

    CONSTRAINT "IndustryOverview_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyDescription" (
    "id" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "products" TEXT NOT NULL,
    "mission" TEXT NOT NULL,
    "vision" TEXT NOT NULL,
    "values" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "buisnessplanId" TEXT NOT NULL,

    CONSTRAINT "CompanyDescription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MarketingPlan" (
    "id" TEXT NOT NULL,
    "localizedDigitalMarketingCampaigns" TEXT NOT NULL,
    "educationalWebinarsWorkshop" TEXT NOT NULL,
    "strategicPartnerShipBuisnessIncubators" TEXT NOT NULL,
    "influencerMarketing" TEXT NOT NULL,
    "contentMarketingSeo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "buisnessplanId" TEXT NOT NULL,

    CONSTRAINT "MarketingPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UseofFunds" (
    "id" TEXT NOT NULL,
    "capitalExpenditures" DOUBLE PRECISION NOT NULL,
    "cash" DOUBLE PRECISION NOT NULL,
    "liabilitiesCapital" DOUBLE PRECISION NOT NULL,
    "currentBorrowing" DOUBLE PRECISION NOT NULL,
    "longTermLiabilities" DOUBLE PRECISION NOT NULL,
    "accountsPayable" DOUBLE PRECISION NOT NULL,
    "otherCurrentLiabilities" DOUBLE PRECISION NOT NULL,
    "initialCapital" DOUBLE PRECISION NOT NULL,
    "workingCapital" DOUBLE PRECISION NOT NULL,
    "plannedInvestment" DOUBLE PRECISION NOT NULL,
    "owner" DOUBLE PRECISION NOT NULL,
    "investor" DOUBLE PRECISION NOT NULL,
    "totalStartupExpenses" DOUBLE PRECISION NOT NULL,
    "totalStartupAssets" DOUBLE PRECISION NOT NULL,
    "totalLiabilites" DOUBLE PRECISION NOT NULL,
    "totalPlannedInvestment" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "financialForecastId" TEXT NOT NULL,

    CONSTRAINT "UseofFunds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectedProfitLoss" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "FY1" DOUBLE PRECISION NOT NULL,
    "FY2" DOUBLE PRECISION NOT NULL,
    "FY3" DOUBLE PRECISION NOT NULL,
    "FY4" DOUBLE PRECISION NOT NULL,
    "FY5" DOUBLE PRECISION NOT NULL,
    "financialForecastId" TEXT NOT NULL,

    CONSTRAINT "ProjectedProfitLoss_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RevenueForecast" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "FY1" DOUBLE PRECISION NOT NULL,
    "FY2" DOUBLE PRECISION NOT NULL,
    "FY3" DOUBLE PRECISION NOT NULL,
    "FY4" DOUBLE PRECISION NOT NULL,
    "FY5" DOUBLE PRECISION NOT NULL,
    "financialForecastId" TEXT NOT NULL,

    CONSTRAINT "RevenueForecast_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BestCaseScenario" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "FY1" DOUBLE PRECISION NOT NULL,
    "FY2" DOUBLE PRECISION NOT NULL,
    "FY3" DOUBLE PRECISION NOT NULL,
    "FY4" DOUBLE PRECISION NOT NULL,
    "FY5" DOUBLE PRECISION NOT NULL,
    "financialForecastId" TEXT NOT NULL,

    CONSTRAINT "BestCaseScenario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorstCaseScenario" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "FY1" DOUBLE PRECISION NOT NULL,
    "FY2" DOUBLE PRECISION NOT NULL,
    "FY3" DOUBLE PRECISION NOT NULL,
    "FY4" DOUBLE PRECISION NOT NULL,
    "FY5" DOUBLE PRECISION NOT NULL,
    "financialForecastId" TEXT NOT NULL,

    CONSTRAINT "WorstCaseScenario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectedCashFlow" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "FY1" DOUBLE PRECISION NOT NULL,
    "FY2" DOUBLE PRECISION NOT NULL,
    "FY3" DOUBLE PRECISION NOT NULL,
    "FY4" DOUBLE PRECISION NOT NULL,
    "FY5" DOUBLE PRECISION NOT NULL,
    "financialForecastId" TEXT NOT NULL,

    CONSTRAINT "ProjectedCashFlow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectedBalanceSheet" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "FY1" DOUBLE PRECISION NOT NULL,
    "FY2" DOUBLE PRECISION NOT NULL,
    "FY3" DOUBLE PRECISION NOT NULL,
    "FY4" DOUBLE PRECISION NOT NULL,
    "FY5" DOUBLE PRECISION NOT NULL,
    "financialForecastId" TEXT NOT NULL,

    CONSTRAINT "ProjectedBalanceSheet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_oauthId_key" ON "User"("oauthId");

-- CreateIndex
CREATE UNIQUE INDEX "BuisnessPlan_companyId_key" ON "BuisnessPlan"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "PitchDeck_companyId_key" ON "PitchDeck"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialForecast_companyId_key" ON "FinancialForecast"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseAssumption_financialForecastId_key" ON "ExpenseAssumption"("financialForecastId");

-- CreateIndex
CREATE UNIQUE INDEX "ExecutiveSummary_buisnessplanId_key" ON "ExecutiveSummary"("buisnessplanId");

-- CreateIndex
CREATE UNIQUE INDEX "CompetitiveComparison_buisnessplanId_key" ON "CompetitiveComparison"("buisnessplanId");

-- CreateIndex
CREATE UNIQUE INDEX "Strategy_buisnessplanId_key" ON "Strategy"("buisnessplanId");

-- CreateIndex
CREATE UNIQUE INDEX "IndustryOverview_buisnessplanId_key" ON "IndustryOverview"("buisnessplanId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyDescription_buisnessplanId_key" ON "CompanyDescription"("buisnessplanId");

-- CreateIndex
CREATE UNIQUE INDEX "MarketingPlan_buisnessplanId_key" ON "MarketingPlan"("buisnessplanId");

-- CreateIndex
CREATE UNIQUE INDEX "UseofFunds_financialForecastId_key" ON "UseofFunds"("financialForecastId");

-- AddForeignKey
ALTER TABLE "Blogs" ADD CONSTRAINT "Blogs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Companies" ADD CONSTRAINT "Companies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BuisnessPlan" ADD CONSTRAINT "BuisnessPlan_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PitchDeck" ADD CONSTRAINT "PitchDeck_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialForecast" ADD CONSTRAINT "FinancialForecast_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RevenueAssumption" ADD CONSTRAINT "RevenueAssumption_financialForecastId_fkey" FOREIGN KEY ("financialForecastId") REFERENCES "FinancialForecast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RevenueLAssumptionItems" ADD CONSTRAINT "RevenueLAssumptionItems_revenueAssumptionId_fkey" FOREIGN KEY ("revenueAssumptionId") REFERENCES "RevenueAssumption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnnualFinancials" ADD CONSTRAINT "AnnualFinancials_financialForecastId_fkey" FOREIGN KEY ("financialForecastId") REFERENCES "FinancialForecast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseAssumption" ADD CONSTRAINT "ExpenseAssumption_financialForecastId_fkey" FOREIGN KEY ("financialForecastId") REFERENCES "FinancialForecast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperatingExpense" ADD CONSTRAINT "OperatingExpense_expenseAssumptionId_fkey" FOREIGN KEY ("expenseAssumptionId") REFERENCES "ExpenseAssumption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExecutiveSummary" ADD CONSTRAINT "ExecutiveSummary_buisnessplanId_fkey" FOREIGN KEY ("buisnessplanId") REFERENCES "BuisnessPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompetitiveComparison" ADD CONSTRAINT "CompetitiveComparison_buisnessplanId_fkey" FOREIGN KEY ("buisnessplanId") REFERENCES "BuisnessPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Strategy" ADD CONSTRAINT "Strategy_buisnessplanId_fkey" FOREIGN KEY ("buisnessplanId") REFERENCES "BuisnessPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IndustryOverview" ADD CONSTRAINT "IndustryOverview_buisnessplanId_fkey" FOREIGN KEY ("buisnessplanId") REFERENCES "BuisnessPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyDescription" ADD CONSTRAINT "CompanyDescription_buisnessplanId_fkey" FOREIGN KEY ("buisnessplanId") REFERENCES "BuisnessPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MarketingPlan" ADD CONSTRAINT "MarketingPlan_buisnessplanId_fkey" FOREIGN KEY ("buisnessplanId") REFERENCES "BuisnessPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UseofFunds" ADD CONSTRAINT "UseofFunds_financialForecastId_fkey" FOREIGN KEY ("financialForecastId") REFERENCES "FinancialForecast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectedProfitLoss" ADD CONSTRAINT "ProjectedProfitLoss_financialForecastId_fkey" FOREIGN KEY ("financialForecastId") REFERENCES "FinancialForecast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RevenueForecast" ADD CONSTRAINT "RevenueForecast_financialForecastId_fkey" FOREIGN KEY ("financialForecastId") REFERENCES "FinancialForecast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BestCaseScenario" ADD CONSTRAINT "BestCaseScenario_financialForecastId_fkey" FOREIGN KEY ("financialForecastId") REFERENCES "FinancialForecast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorstCaseScenario" ADD CONSTRAINT "WorstCaseScenario_financialForecastId_fkey" FOREIGN KEY ("financialForecastId") REFERENCES "FinancialForecast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectedCashFlow" ADD CONSTRAINT "ProjectedCashFlow_financialForecastId_fkey" FOREIGN KEY ("financialForecastId") REFERENCES "FinancialForecast"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectedBalanceSheet" ADD CONSTRAINT "ProjectedBalanceSheet_financialForecastId_fkey" FOREIGN KEY ("financialForecastId") REFERENCES "FinancialForecast"("id") ON DELETE CASCADE ON UPDATE CASCADE;
