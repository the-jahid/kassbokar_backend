// Adjust the import according to your project structure
import prisma from "../../../config/db";
import error from "../../../utils/error";
import { generateProjectedCashflowData } from "../../../utils/helpers/financialForecastHelpers/projectedCashflow";

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

// Create Projected Cash Flow Service
export const createProjectedCashFlowService = async (financial_forecast_id: string, inputData: object) => {
    
    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    });

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    let projectedCashFlow = await prisma.projectedCashFlow.findFirst({
        where:{
            financialForecastId: financial_forecast_id
        }
    });

    if(projectedCashFlow){
        throw error('Projected cash flow data already exists. Please update or delete the existing data to create a new one.');
    }

    const projectedCashFlowData = await generateProjectedCashflowData(inputData);
    const mappedData = mapItems(projectedCashFlowData);

    const createData = mappedData.map(item => ({
        financialForecastId: financial_forecast_id,
        name: item.name,
        FY1: item.FY1,
        FY2: item.FY2,
        FY3: item.FY3,
        FY4: item.FY4,
        FY5: item.FY5
    }));

    const batchPayload = await prisma.projectedCashFlow.createMany({
        data: createData
    });

    if(batchPayload.count === 0){
        throw error('There is an error creating projectedCashFlow', 500);
    }   

    return batchPayload;
};

// Get Projected Cash Flow Service
export const getProjectedCashFlowService = async (financial_forecast_id: string) => {

    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    });

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    const projectedCashFlow = await prisma.projectedCashFlow.findMany({
        where:{
            financialForecastId: financial_forecast_id
        },
    });

    if (projectedCashFlow.length === 0) {
        throw error('Projected cash flow not found.', 404);
    }

    return projectedCashFlow;
};

// Update Projected Cash Flow Service
interface ProjectedCashFlowInput {
    projectedCashFlow: {
        id: string;
        name: string;
        FY1: number;
        FY2: number;
        FY3: number;
        FY4: number;
        FY5: number;
    }[];
}

export const updateProjectedCashFlowService = async (financial_forecast_id: string, inputData: ProjectedCashFlowInput) => {
 
    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    });

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    const updatedProjectedCashFlow = await Promise.all(inputData.projectedCashFlow.map(async (scenario) => {
        const existingRecord = await prisma.projectedCashFlow.findUnique({
            where: {
                id: scenario.id,
                financialForecastId: financial_forecast_id
            },
        });

        if (!existingRecord) {
            throw error(`Record with id ${scenario.id} not found.`, 404);
        }

        return await prisma.projectedCashFlow.update({
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

    return updatedProjectedCashFlow;
};

// Delete Projected Cash Flow Service
export const deleteProjectedCashFlowService = async (financial_forecast_id: string) => {

    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    });

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    await prisma.projectedCashFlow.deleteMany({
        where: {
            financialForecastId: financial_forecast_id
        }
    });

    return { message: 'Projected cash flow deleted successfully.' };
};