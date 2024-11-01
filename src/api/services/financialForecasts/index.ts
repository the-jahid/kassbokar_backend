import { create } from "domain";
import prisma from "../../../config/db";
import { generateBestCaseScenarioData } from "../../../utils/helpers/financialForecastHelpers/bestCaseScenario";
import { generateProjectedBalancesheetData } from "../../../utils/helpers/financialForecastHelpers/projectedBalanceSheet";
import { generateProjectedCashflowData } from "../../../utils/helpers/financialForecastHelpers/projectedCashflow";
import { generateProjectedProfitLossData } from "../../../utils/helpers/financialForecastHelpers/projectedProfitloss";
import { generateRevenueAssumptiondata } from "../../../utils/helpers/financialForecastHelpers/revenueAssumption";
import { generateUseofFundsdata } from "../../../utils/helpers/financialForecastHelpers/useofFunds";
import { generateWorstCaseScenarioData } from "../../../utils/helpers/financialForecastHelpers/worstCaseScenario";
import error from "../../../utils/error";
import { generateAnnualFinancialData } from "../../../utils/helpers/financialForecastHelpers/annualFinancials";


// dry items start

interface RevenueItem {
    name: string;
    pricePerUnit: number;
    data: {
        FY1: number;
        FY2: number;
        FY3: number;
        FY4: number;
        FY5: number;
    };
}

interface AnnualDataItem {
    year: number;
    value: number;
}

const mapAnnualData = (data: { year: string; value: number }[]) => {
    return data.map((item) => ({
        year: item.year,
        value: item.value
    }));
};

// use of funds
interface UseOfFundsData {
    accounts_payable: number;
    capital_expenditures: number;
    cash: number;
    current_borrowing: number;
    initial_capital: number;
    investor: number;
    liabilities_capital: number;
    long_term_liabilities: number;
    other_current_liabilities: number;
    owner: number;
    planned_investment: number;
    total_liabilities: number;
    total_planned_investment: number;
    total_startup_assets: number;
    total_startup_expenses: number;
    working_capital: number;
}

const mapUseOfFundsData = (data: UseOfFundsData) => {
    return {
        accountsPayable: data.accounts_payable,
        capitalExpenditures: data.capital_expenditures,
        cash: data.cash,
        currentBorrowing: data.current_borrowing,
        initialCapital: data.initial_capital,
        investor: data.investor,
        liabilitiesCapital: data.liabilities_capital,
        longTermLiabilities: data.long_term_liabilities,
        otherCurrentLiabilities: data.other_current_liabilities,
        owner: data.owner,
        plannedInvestment: data.planned_investment,
        totalLiabilites: data.total_liabilities, // Add this line
        totalPlannedInvestment: data.total_planned_investment,
        totalStartupAssets: data.total_startup_assets,
        totalStartupExpenses: data.total_startup_expenses,
        workingCapital: data.working_capital
    };
};

// use of funds ends

interface ProjectedProfitLossItem {
    name: string;
    data: {
        FY1: number;
        FY2: number;
        FY3: number;
        FY4: number;
        FY5: number;
    };
}

const mapitems = (items: ProjectedProfitLossItem[]) => {
    return items.map(item => ({
        name: item.name,
        FY1: item.data.FY1,
        FY2: item.data.FY2,
        FY3: item.data.FY3,
        FY4: item.data.FY4,
        FY5: item.data.FY5
    }));
};

interface Expense {
    category: string;
    amount: number;
    currency: string;
    growth_rate: number;
    growth_rate_unit: string;
    assumptions: string;
}

interface InputData {
    initial_capital: number;
    initial_capital_assumptions: string;
    working_capital: number;
    working_capital_assumptions: string;
    capital_expenditure: number;
    capital_expenditure_assumptions: string;
    operating_expenses: Expense[];
}

interface ExpenseAssumption {
    initialCapital: string;
    initialCapitalAssumptions: string;
    workingCapital: string;
    workingCapitalAssumptions: string;
    capitalExpenditure: string;
    capitalExpenditureAssumptions: string;
    operatingExpenses: {
        create: {
            category: string;
            amount: string;
            currency: string;
            growthRate: string;
            growthRateUnit: string;
            assumptions: string;
        }[];
    };
}

const mapExpense = (expense: Expense) => ({
    category: expense.category,
    amount: expense.amount,
    currency: expense.currency,
    growthRate: expense.growth_rate,
    growthRateUnit: expense.growth_rate_unit,
    assumptions: expense.assumptions,
});

const mapInputDataToExpenseAssumption = (inputData: FinancialForecastInputData): ExpenseAssumption => ({
    initialCapital: inputData.initial_capital,
    initialCapitalAssumptions: inputData.initial_capital_assumptions,
    workingCapital: inputData.working_capital,
    workingCapitalAssumptions: inputData.working_capital_assumptions,
    capitalExpenditure: inputData.capital_expenditure,
    capitalExpenditureAssumptions: inputData.capital_expenditure_assumptions,
    operatingExpenses: {
        create: inputData.operating_expenses.map(expense => ({
            category: expense.category,
            amount: expense.amount.toString(),
            currency: expense.currency,
            growthRate: expense.growth_rate.toString(),
            growthRateUnit: expense.growth_rate_unit,
            assumptions: expense.assumptions,
        })),
    },
});

// Define the FinancialType enum
enum FinancialType {
    COGS = "COGS",
    EBITDA = "EBITDA",
    REVENUES = "REVENUES"
  }
  
  // Define the type for annual financial data item
  interface AnnualFinancialDataItem {
    type: string;
    FY1: number;
    FY2: number;
    FY3: number;
    FY4: number;
    FY5: number;
  }
  
  // Helper function to map annual financial data item
  const mapAnnualFinancialDataItem = (item: AnnualFinancialDataItem) => ({
    type: item.type as FinancialType,
    FY1: item.FY1,
    FY2: item.FY2,
    FY3: item.FY3,
    FY4: item.FY4,
    FY5: item.FY5,
  });

  interface FinancialForecastInputData {
    is_new_company: string;
    company_description: string;
    main_goal_of_business_plan: string;
    selected_language_for_plan: string;
    company_name: string;
    country: string;
    city: string;
    success_factors: string;
    products_services: {
        product_service_name: string;
        price: string;
        product_service_description_benefits: string;
    }[];
    direct_competitors: {
        competitor_name: string;
        locations: string;
    }[];
    management_team_members: {
        name: string;
        title: string;
        background?: string;
    }[];
    is_business_raising_funding: string;
    is_business_seeking_bank_loan: string;
    initial_capital: string;
    initial_capital_assumptions: string;
    working_capital: string;
    working_capital_assumptions: string;
    capital_expenditure: string;
    capital_expenditure_assumptions: string;
    operating_expenses: {
        category: string;
        amount: string;
        currency: string;
        growth_rate: string;
        growth_rate_unit: string;
        assumptions: string;
    }[];
  }

// dry items end---------------------------------------------------

export const createfinancialForecastService = async (inputData: FinancialForecastInputData, company_id: string) => {
    try {
        
        const company = await prisma.companies.findUnique({
            where: {
                id: company_id
            }
        });

        if (!company) {
            throw error('No company found. Please create a company first to generate a financial forecast.', 404);
        }

        let financialForecast = await prisma.financialForecast.findUnique({
            where: {
                companyId: company_id
            }
        });

        if (financialForecast) {
            throw error('A financial forecast already exists. You can either update or delete it.', 400);
        }
        const newData = {inputData}
        const RevenueAssumptionsdata = await generateRevenueAssumptiondata(inputData);
        const useofFundsdata = await generateUseofFundsdata(inputData);
        const projectedProfitLossdata = await generateProjectedProfitLossData(inputData);
        const projectedCashflowData = await generateProjectedCashflowData(inputData);
        const bestCaseScenarioData = await generateBestCaseScenarioData(inputData);
        const worstCaseScenarioData = await generateWorstCaseScenarioData(inputData);
        const projectedBalanceSheet = await generateProjectedBalancesheetData(inputData);
        const annualFinancialsData = await generateAnnualFinancialData(inputData)

        const transformedData = RevenueAssumptionsdata.revenueLineItem.map(item => ({
            name: item.name,
            pricePerUnit: item.pricePerUnit,
            revenueAssumptionItems: {
                create: item.data.map(dataItem => ({
                    unitName: dataItem.unitName,
                    FY1: dataItem.FY1,
                    FY2: dataItem.FY2,
                    FY3: dataItem.FY3,
                    FY4: dataItem.FY4,
                    FY5: dataItem.FY5,
                }))
            }
        }));

        financialForecast = await prisma.financialForecast.create({
            data: {
                companyId: company_id,
                revenueAssumption: {
                    create: transformedData
                },
                expenseAssumption: {
                    create:   mapInputDataToExpenseAssumption(inputData),
                },
                useofFunds: {
                    create: mapUseOfFundsData(useofFundsdata)
                },
                projectedProfitLoss: {
                    create: mapitems(projectedProfitLossdata)
                },
                projectedBalanceSheet: {
                    create: mapitems(projectedBalanceSheet)
                },
                projectedCashFlow: {
                    create: mapitems(projectedCashflowData)
                },
                bestCaseScenario: {
                    create: mapitems(bestCaseScenarioData)
                },
                worstCaseScenario: {
                    create: mapitems(worstCaseScenarioData)
                },
                
                annualFinancials:{
                   create: annualFinancialsData.map(mapAnnualFinancialDataItem)
                }
            }
        });

        

        return financialForecast;
    } catch (err) {
        console.log('error', err)
        throw error('Failed to create financial forecast.');
    }
};

export const getfinancialForecastService = async (company_id: string) => {
    const financialForecast = await prisma.financialForecast.findUnique({
        where: {
            companyId: company_id
        },
        include: {
            revenueAssumption: {
                include:{
                    revenueAssumptionItems:true
                }
            },
            bestCaseScenario: true,
            projectedBalanceSheet: true,
            projectedCashFlow: true,
            projectedProfitLoss: true,
            useofFunds: true,
            worstCaseScenario: true,
        }
    });

    if (!financialForecast) {
        throw error('No financial forecast found for this company ID.');
    }

    return financialForecast;
};

export const deletefinancialForecastService = async (financial_forecast_id: string) => {
    let financialForecast = await prisma.financialForecast.findUnique({
        where: {
            companyId: financial_forecast_id
        }
    });

    if (!financialForecast) {
        throw error('Financial Forecast not found on this id', 404);
    }

    financialForecast = await prisma.financialForecast.delete({
        where: {
            companyId: financial_forecast_id,
        }
    });

    return financialForecast;
};