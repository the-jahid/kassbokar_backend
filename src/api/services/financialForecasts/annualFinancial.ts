// Adjust the import according to your project structure
import prisma from "../../../config/db";
import error from "../../../utils/error";
import { generateAnnualFinancialData } from "../../../utils/helpers/financialForecastHelpers/annualFinancials";

enum FinancialType {
    COGS = "COGS",
    EBITDA = "EBITDA",
    REVENUES = "REVENUES"
  }

interface Item {
    name: string;
    data: {
        FY1: number;
        FY2: number;
        FY3: number;
        FY4: number;
        FY5: number;
    };
}

const mapItems = (items: Item[]) => {
    return items.map(item => ({
        name: item.name,
        FY1: item.data.FY1,
        FY2: item.data.FY2,
        FY3: item.data.FY3,
        FY4: item.data.FY4,
        FY5: item.data.FY5
    }));
};

// Create Annual Financial Service
export const createAnnualFinancialService = async (financial_forecast_id: string, inputData: object) => {
    
    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    });

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    let annualFinancial = await prisma.annualFinancials.findFirst({
        where:{
            financialForecastId:financial_forecast_id
        }
    });

    if(annualFinancial){
        throw error('Annual financial data already exists. Please update or delete the existing data to create a new one.');
    }

    const annualFinancialData = await generateAnnualFinancialData(inputData);
    
    const annualFinacial = await prisma.annualFinancials.createMany({
        data: annualFinancialData.map((item) => ({
            financialForecastId: financial_forecast_id,
            type: item.type as FinancialType,
            FY1: item.FY1,
            FY2: item.FY2,
            FY3: item.FY3,
            FY4: item.FY4,
            FY5: item.FY5,
        }))
    })

   
    return annualFinacial
    
};

// Get Annual Financial Service
export const getAnnualFinancialService = async (financial_forecast_id: string) => {

    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    });

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    const annualFinancial = await prisma.annualFinancials.findMany({
        where:{
            financialForecastId:financial_forecast_id
        },
    });

    if (annualFinancial.length === 0) {
        throw error('Annual financial data not found.', 404);
    }

    return annualFinancial;
};

// Update Annual Financial Service
interface AnnualFinancialInput {
        id: string;
        type: FinancialType;
        FY1: number;
        FY2: number;
        FY3: number;
        FY4: number;
        FY5: number;
}



export const updateAnnualFinancialService = async (financial_forecast_id: string, inputData: AnnualFinancialInput) => {
 
    let financialForecast = await prisma.financialForecast.findUnique({
        where: {
            id: financial_forecast_id
        }
    });

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }
    const validateFinancialType = (type: string): type is FinancialType => {
        return Object.values(FinancialType).includes(type as FinancialType);
    };
    // Validate FinancialType
    if (!validateFinancialType(inputData.type)) {
        throw error(`Invalid financial type: ${inputData.type}. Expected one of ${Object.values(FinancialType).join(', ')}.`, 400);
    }

    const updatedAnnualFinancial = await prisma.annualFinancials.update({
        where: {
             
                financialForecastId: financial_forecast_id,
                id: inputData.id
            
        },
        data: {
            type: inputData.type as FinancialType,
            FY1: inputData.FY1,
            FY2: inputData.FY2,
            FY3: inputData.FY3,
            FY4: inputData.FY4,
            FY5: inputData.FY5
        }
    });

    return updatedAnnualFinancial;

};

// Delete Annual Financial Service
export const deleteAnnualFinancialService = async (financial_forecast_id: string) => {

    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    });

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    await prisma.annualFinancials.deleteMany({
        where: {
            financialForecastId:financial_forecast_id
        }
    });

    return { message: 'Annual financial data deleted successfully.' };
};