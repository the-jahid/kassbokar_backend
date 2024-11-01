// Adjust the import according to your project structure
import prisma from "../../../config/db";
import error from "../../../utils/error";

// Create Expense Assumption Service
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





export const createExpenseAssumptionService = async (financial_forecast_id: string, inputData: FinancialForecastInputData) => {

    let financialForecast = await prisma.financialForecast.findUnique({
        where: {
            id: financial_forecast_id
        }
    });

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    let expenseAssumption = await prisma.expenseAssumption.findUnique({
        where:{
            financialForecastId:financial_forecast_id
        }
    })

    if (expenseAssumption) {
      throw error('Already expense Assumption Available on this Id', 404);
    }

     expenseAssumption = await prisma.expenseAssumption.create({
        data: {
            capitalExpenditure:inputData.capital_expenditure,
            capitalExpenditureAssumptions:inputData.capital_expenditure_assumptions,
            financialForecastId:financial_forecast_id,
            initialCapital:inputData.initial_capital,
            initialCapitalAssumptions:inputData.initial_capital_assumptions,
            workingCapital:inputData.working_capital,
            workingCapitalAssumptions:inputData.working_capital_assumptions,
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
        }
    })

    if(!expenseAssumption) {
        throw error('Cant created expenseAssumption', 400)
    }
        
    return expenseAssumption

};

// Get Expense Assumption Service
export const getExpenseAssumptionService = async (financial_forecast_id: string) => {
    let financialForecast = await prisma.financialForecast.findUnique({
        where: {
            id: financial_forecast_id
        }
    });

    if (!financialForecast) {
        throw new Error('No financial forecast found for this ID. Please create a financial forecast first.');
    }

    const expenseAssumption = await prisma.expenseAssumption.findUnique({
        where:{
            financialForecastId:financial_forecast_id,
            
        },
        include:{
            operatingExpenses:true
        }
    })

    if (!expenseAssumption) {
        throw new Error('No expense assumption found for this financial forecast ID.');
    }

    return expenseAssumption;
};



export const updateExpenseAssumptionService = async (financial_forecast_id: string, inputData: FinancialForecastInputData) => {
    let financialForecast = await prisma.financialForecast.findUnique({
      where: {
        id: financial_forecast_id
      }
    });

      let expenseAssumption = await prisma.expenseAssumption.findUnique({
        where:{
            financialForecastId:financial_forecast_id
        }
    })

    if (!expenseAssumption) {
       
      throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }
  
     expenseAssumption = await prisma.expenseAssumption.update({
      where: { financialForecastId: financial_forecast_id },
      data: {
            capitalExpenditure:inputData.capital_expenditure,
            capitalExpenditureAssumptions:inputData.capital_expenditure_assumptions,
            financialForecastId:financial_forecast_id,
            initialCapital:inputData.initial_capital,
            initialCapitalAssumptions:inputData.initial_capital_assumptions,
            workingCapital:inputData.working_capital,
            workingCapitalAssumptions:inputData.working_capital_assumptions,
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
      }
    });
  
    return expenseAssumption;
  };

export const deleteExpenseAssumptionService = async (financial_forecast_id: string) => {
    let financialForecast = await prisma.financialForecast.findUnique({
        where: {
            id: financial_forecast_id
        }
    });

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    await prisma.expenseAssumption.delete({
        where: {
            financialForecastId: financial_forecast_id
        }
    });

    return { message: 'Expense assumption deleted successfully.' };
};