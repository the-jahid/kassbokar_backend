// Adjust the import according to your project structure
import prisma from "../../../config/db";
import error from "../../../utils/error";
import { generateProjectedBalancesheetData } from "../../../utils/helpers/financialForecastHelpers/projectedBalanceSheet";

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

// Create Projected Balance Sheet Service
export const createProjectedBalanceSheetService = async (financial_forecast_id: string, inputData: object) => {
    
    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    });

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    let projectedBalanceSheet = await prisma.projectedBalanceSheet.findFirst({
        where:{
            financialForecastId: financial_forecast_id
        }
    });

    if(projectedBalanceSheet){
        throw error('Projected balance sheet data already exists. Please update or delete the existing data to create a new one.');
    }

    const projectedBalanceSheetData = await generateProjectedBalancesheetData(inputData);
    const mappedData = mapItems(projectedBalanceSheetData);

    const createData = mappedData.map(item => ({
        financialForecastId: financial_forecast_id,
        name: item.name,
        FY1: item.FY1,
        FY2: item.FY2,
        FY3: item.FY3,
        FY4: item.FY4,
        FY5: item.FY5
    }));

    const batchPayload = await prisma.projectedBalanceSheet.createMany({
        data: createData
    });

    if(batchPayload.count === 0){
        throw error('There is an error creating projectedBalanceSheet', 500);
    }   

    return batchPayload;
};

// Get Projected Balance Sheet Service
export const getProjectedBalanceSheetService = async (financial_forecast_id: string) => {

    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    });

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    const projectedBalanceSheet = await prisma.projectedBalanceSheet.findMany({
        where:{
            financialForecastId: financial_forecast_id
        },
    });

    if (projectedBalanceSheet.length === 0) {
        throw error('Projected balance sheet not found.', 404);
    }

    return projectedBalanceSheet;
};

// Update Projected Balance Sheet Service
interface ProjectedBalanceSheetInput {
    projectedBalanceSheet: {
        id: string;
        name: string;
        FY1: number;
        FY2: number;
        FY3: number;
        FY4: number;
        FY5: number;
    }[];
}

export const updateProjectedBalanceSheetService = async (financial_forecast_id: string, inputData: ProjectedBalanceSheetInput) => {
 
    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    });

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    const updatedProjectedBalanceSheet = await Promise.all(inputData.projectedBalanceSheet.map(async (scenario) => {
        const existingRecord = await prisma.projectedBalanceSheet.findUnique({
            where: {
                id: scenario.id,
                financialForecastId: financial_forecast_id
            },
        });

        if (!existingRecord) {
            throw error(`Record with id ${scenario.id} not found.`, 404);
        }

        return await prisma.projectedBalanceSheet.update({
            where: {
                id: scenario.id,
            },
            data: {
                name: scenario.name,
                FY1: scenario.FY1,
                FY2: scenario.FY2,
                FY3: scenario.FY3,
                FY4: scenario.FY4,
                FY5: scenario.FY5,
            }
        });
    }));

    return updatedProjectedBalanceSheet;
};

// Delete Projected Balance Sheet Service
export const deleteProjectedBalanceSheetService = async (financial_forecast_id: string) => {

    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    });

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    await prisma.projectedBalanceSheet.deleteMany({
        where: {
            financialForecastId: financial_forecast_id
        }
    });

    return { message: 'Projected balance sheet deleted successfully.' };
};