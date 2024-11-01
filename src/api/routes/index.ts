import {Router} from 'express'
import authRoutes from './auth';
import companiesRoute from './companies';
import clerkAuthenticate from '../middlewares/clerkAuthenticate';
import buisnessPlanRoute from './buisnessPlan';
import executiveSummaryRoute from './buisnessPlan/executiveSummary';
import companyDescriptionRoute from './buisnessPlan/compnayDescription';
import industryOverviewRoute from './buisnessPlan/industryOverview';
import competitiveComparisonRoute from './buisnessPlan/competitiveComparison';
import strategyImplementationRoute from './buisnessPlan/strategyImplementation';
import marketingPlanRoute from './buisnessPlan/marketingPlan';
import useofFundsRoute from './financialForecasts/useofFunds';
import revenueForecastRoute from './financialForecasts/revenueForecast';
import bestCaseScenarioRoute from './financialForecasts/bestCaseScenario';
import worstCaseScenarioRoute from './financialForecasts/worstCaseScenario';
import projectedCashFlowRoute from './financialForecasts/cashFlow';
import projectedProfitLossRoute from './financialForecasts/projectedProfitLoss';
import revenueAssumption from './financialForecasts/revenueAssumption';
import financialForecast from './financialForecasts';
import projectedBalanceSheetRoute from './financialForecasts/projectedBalanceSheet';
import revenueAssumptionroute from './financialForecasts/revenueAssumption';
import expenseaAssumptionRoute from './financialForecasts/expenseAssumption';
import annualFinancialRoute from './financialForecasts/annualFinancial';
import expertiseAuth from './expertise';
import expertiseBookingAuth from './expertiseBooking';
import authenticateAdmin from '../middlewares/authenticateAdmin';
import handleClerkWebhook from '../webhooks/clerkWebhook';
import blogsRoute from './blogs';
import { getAllBlogsController } from '../controllers/blogs';

// import clerkAuthenticate from '../middlewares/clerkAuthenticate';


const router = Router();
// public route
router.get('/api/v1/blogs/getAll',  getAllBlogsController  )
// clerkAuthenticate 
router.post('/api/webhook/clerk', handleClerkWebhook);

// normal clerkAuthenticate
// router.use('/api/v1/auth', authRoutes)
router.use('/api/v1/companies', clerkAuthenticate,  companiesRoute)
router.use('/api/v1/blogs', clerkAuthenticate,  blogsRoute)


// buisness plan 
router.use('/api/v1/buisnessPlan', clerkAuthenticate, buisnessPlanRoute)
router.use('/api/v1/executiveSummary', clerkAuthenticate, executiveSummaryRoute)
router.use('/api/v1/companyDescription', clerkAuthenticate, companyDescriptionRoute)
router.use('/api/v1/industryOverview', clerkAuthenticate, industryOverviewRoute)
router.use('/api/v1/competitiveComparison', clerkAuthenticate, competitiveComparisonRoute)
router.use('/api/v1/strategyImplementation', clerkAuthenticate, strategyImplementationRoute)
router.use('/api/v1/marketingPlan', clerkAuthenticate, marketingPlanRoute)

// financialForecast
router.use('/api/v1/financialForecast', clerkAuthenticate, financialForecast) 

// router.use('/api/v1/revenueForecast', clerkAuthenticate, revenueForecastRoute)
router.use('/api/v1/useofFund', clerkAuthenticate, useofFundsRoute)
router.use('/api/v1/bestCaseScenario', clerkAuthenticate, bestCaseScenarioRoute)
router.use('/api/v1/worstCaseScenario', clerkAuthenticate, worstCaseScenarioRoute)
router.use('/api/v1/projectedProfitLoss', clerkAuthenticate, projectedProfitLossRoute)
router.use('/api/v1/projectedCashFlow', clerkAuthenticate, projectedCashFlowRoute)
router.use('/api/v1/projectedBalanceSheet', clerkAuthenticate, projectedBalanceSheetRoute)

router.use('/api/v1/revenueAssumption', clerkAuthenticate,  revenueAssumptionroute )
router.use('/api/v1/expenseAssumption', clerkAuthenticate, expenseaAssumptionRoute)
router.use('/api/v1/annualFinancial', clerkAuthenticate, annualFinancialRoute )

//  Super admin router

// admin handles expertise
router.use('/api/v1/expertise', clerkAuthenticate,  expertiseAuth)
router.use('/api/v1/expertiseBooking', clerkAuthenticate, expertiseBookingAuth  )

export default router

