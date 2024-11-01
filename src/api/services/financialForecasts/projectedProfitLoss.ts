// Adjust the import according to your project structure
import prisma from "../../../config/db";
import error from "../../../utils/error";
import { generateProjectedProfitLossData } from "../../../utils/helpers/financialForecastHelpers/projectedProfitloss";

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

// Create Projected profit loss Service
export const createprojectedProfitLossService = async (financial_forecast_id: string, inputData: object) => {
    
    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    })

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    let projectedProfitLoss  = await prisma.projectedProfitLoss.findFirst({
        where:{
            financialForecastId:financial_forecast_id
        }
    })

    if(projectedProfitLoss){
        throw error('Projected profit loss data already exists. Please update or delete the existing data to create a new one.');
    }

    const projectedProfitLossData = await generateProjectedProfitLossData(inputData);
    const mappedData = mapItems(projectedProfitLossData);

    const createData = mappedData.map(item => ({
        financialForecastId: financial_forecast_id,
        name: item.name,
        FY1: item.FY1,
        FY2: item.FY2,
        FY3: item.FY3,
        FY4: item.FY4,
        FY5: item.FY5
    }));

    const batchPayload = await prisma.projectedProfitLoss.createMany({
        data: createData
    });

    if(batchPayload.count === 0){
        throw error('There is an error creating projectedProfitLoss', 500);
    }     

    return batchPayload;
};

// Get Projected profit loss Service
export const getprojectedProfitLossService = async (financial_forecast_id: string) => {

    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    })

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    const projectedProfitLoss = await prisma.projectedProfitLoss.findMany({
        where:{
            financialForecastId:financial_forecast_id
        },
    })

    if (projectedProfitLoss.length === 0) {
        throw error('Projected profit loss not found.', 404);
    }

    return projectedProfitLoss;
};

// Update Projected profit loss Service
interface projectedProfitLossInput {
    projectedProfitLoss: {
        id: string;
        name: string;
        FY1: number;
        FY2: number;
        FY3: number;
        FY4: number;
        FY5: number;
    }[];
}

export const updateprojectedProfitLossService = async (financial_forecast_id: string, inputData: projectedProfitLossInput) => {
 
    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    })  

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    const updatedprojectedProfitLoss = await Promise.all(inputData.projectedProfitLoss.map(async (scenario) => {
        const existingRecord = await prisma.projectedProfitLoss.findUnique({
            where: {
                id: scenario.id,
                financialForecastId:financial_forecast_id
            },
        });

        if (!existingRecord) {
            throw error(`Record with id ${scenario.id} not found.`, 404);
        }

        return await prisma.projectedProfitLoss.update({
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

    return updatedprojectedProfitLoss;

};

// Delete Projected profit loss Service
export const deleteprojectedProfitLossService = async (financial_forecast_id: string) => {

    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    })  

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    await prisma.projectedProfitLoss.deleteMany({
        where: {
            financialForecastId: financial_forecast_id
        }
    });

    return { message: 'Projected profit loss deleted successfully.' };
};