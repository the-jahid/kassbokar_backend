import prisma from '../../../config/db';
import error from '../../../utils/error';
import { generateUseofFundsdata } from '../../../utils/helpers/financialForecastHelpers/useofFunds';


// Create Use of Funds Service
export const createUseofFundsService = async (financial_forecast_id: string, inputData: object) => {
    let useofFunds = await prisma.useofFunds.findUnique({
        where: {
           financialForecastId: financial_forecast_id
        }
    });

    if (useofFunds) {
        throw  error('A use of funds already exists. You can either update it or delete it to make new changes.', 400);
    }

    const {
        accounts_payable,
        capital_expenditures,
        cash,
        current_borrowing,
        initial_capital,
        investor,
        liabilities_capital,
        long_term_liabilities,
        other_current_liabilities,
        total_liabilities,
        owner,
        planned_investment,
        total_planned_investment,
        total_startup_assets,
        total_startup_expenses,
        working_capital
    } = await generateUseofFundsdata(inputData);

    useofFunds = await prisma.useofFunds.create({
        data: {
            accountsPayable: accounts_payable,
            capitalExpenditures: capital_expenditures,
            cash: cash,
            currentBorrowing: current_borrowing,
            initialCapital: initial_capital,
            investor: investor,
            liabilitiesCapital: liabilities_capital,
            longTermLiabilities: long_term_liabilities,
            otherCurrentLiabilities: other_current_liabilities,
            totalLiabilites: total_liabilities,
            owner: owner,
            plannedInvestment: planned_investment,
            totalPlannedInvestment: total_planned_investment,
            totalStartupAssets: total_startup_assets,
            totalStartupExpenses: total_startup_expenses,
            workingCapital: working_capital,
            financialForecast: {
                connect: {
                    id: financial_forecast_id
                }
            }
        }
    });

    return useofFunds;
};

// Get Use of Funds Service
export const getUseofFundsService = async (financial_forecast_id: string) => {
    const useofFunds = await prisma.useofFunds.findUnique({
        where: {
            financialForecastId: financial_forecast_id
        }
    });

    if (!useofFunds) {
        throw new Error('Use of funds not found.');
    }

    return useofFunds;
};

// Update Use of Funds Service
interface UseofFundsInput {
    accounts_payable: number;
    capital_expenditures: number;
    cash: number;
    current_borrowing: number;
    initial_capital: number;
    investor: number;
    liabilities_capital: number;
    long_term_liabilities: number;
    other_current_liabilities: number;
    total_liabilities: number;
    owner: number;
    planned_investment: number;
    total_planned_investment: number;
    total_startup_assets: number;
    total_startup_expenses: number;
    working_capital: number;
}

export const updateUseofFundsService = async (useof_fund_id: string, inputData: UseofFundsInput) => {
    let useofFunds = await prisma.useofFunds.findUnique({
        where: {
            id: useof_fund_id
        }
    });
    
    if (!useofFunds) {
        throw new Error('Use of funds not found.');
    }

    const {
        accounts_payable,
        capital_expenditures,
        cash,
        current_borrowing,
        initial_capital,
        investor,
        liabilities_capital,
        long_term_liabilities,
        other_current_liabilities,
        total_liabilities,
        owner,
        planned_investment,
        total_planned_investment,
        total_startup_assets,
        total_startup_expenses,
        working_capital
    } = inputData;


    useofFunds = await prisma.useofFunds.update({
        where: {
           id: useof_fund_id,
            
        },
        data: {
            accountsPayable: accounts_payable,
            capitalExpenditures: capital_expenditures,
            cash: cash,
            currentBorrowing: current_borrowing,
            initialCapital: initial_capital,
            investor: investor,
            liabilitiesCapital: liabilities_capital,
            longTermLiabilities: long_term_liabilities,
            otherCurrentLiabilities: other_current_liabilities,
            totalLiabilites: total_liabilities,
            owner: owner,
            plannedInvestment: planned_investment,
            totalPlannedInvestment: total_planned_investment,
            totalStartupAssets: total_startup_assets,
            totalStartupExpenses: total_startup_expenses,
            workingCapital: working_capital
        }
    });

    return useofFunds;
};

// Delete Use of Funds Service
export const deleteUseofFundsService = async (useof_fund_id: string) => {
    const useofFunds = await prisma.useofFunds.findUnique({
        where: {
            id: useof_fund_id
        }
    });

    if (!useofFunds) {
        throw new Error('Use of funds not found.');
    }

    await prisma.useofFunds.delete({
        where: {
            id: useof_fund_id
        }
    });

    return { message: 'Use of funds deleted successfully.' };
};