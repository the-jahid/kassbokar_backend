// Adjust the import according to your project structure
import prisma from "../../../config/db";
import error from "../../../utils/error";
import { generateWorstCaseScenarioData } from "../../../utils/helpers/financialForecastHelpers/worstCaseScenario";

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

// Create Worst case Scenario Service
export const createworstCaseScenarioService = async (financial_forecast_id: string, inputData: object) => {
    
    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    })

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    let worstCaseScenario  = await prisma.worstCaseScenario.findFirst({
        where:{
            financialForecastId:financial_forecast_id
        }
    })

    if(worstCaseScenario){
        throw error('Worst case scenario data already exists. Please update or delete the existing data to create a new one.');
    }

    const worstCaseScenarioData = await generateWorstCaseScenarioData(inputData);
    const mappedData = mapItems(worstCaseScenarioData);

    const createData = mappedData.map(item => ({
        financialForecastId: financial_forecast_id,
        name: item.name,
        FY1: item.FY1,
        FY2: item.FY2,
        FY3: item.FY3,
        FY4: item.FY4,
        FY5: item.FY5
    }));

    const batchPayload = await prisma.worstCaseScenario.createMany({
        data: createData
    });

    if(batchPayload.count === 0){
        throw error('There is an error creating worstCaseScenario', 500);
    }   

    return batchPayload;
};

// Get Worst case Scenario Service
export const getworstCaseScenarioService = async (financial_forecast_id: string) => {

    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    })

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    const worstCaseScenario = await prisma.worstCaseScenario.findMany({
        where:{
            financialForecastId:financial_forecast_id
        },
    })

    if (worstCaseScenario.length === 0) {
        throw error('Worst case scenario not found.', 404);
    }

    return worstCaseScenario;
};

// Update Worst case Scenario Service
interface worstCaseScenarioInput {
    worstCaseScenario: {
        id: string;
        name: string;
        FY1: number;
        FY2: number;
        FY3: number;
        FY4: number;
        FY5: number;
    }[];
}

export const updateworstCaseScenarioService = async (financial_forecast_id: string, inputData: worstCaseScenarioInput) => {
 
    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    })  

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    const updatedworstCaseScenario = await Promise.all(inputData.worstCaseScenario.map(async (scenario) => {
        const existingRecord = await prisma.worstCaseScenario.findUnique({
            where: {
                id: scenario.id,
                financialForecastId:financial_forecast_id
            },
        });

        if (!existingRecord) {
            throw error(`Record with id ${scenario.id} not found.`, 404);
        }

        return await prisma.worstCaseScenario.update({
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

    return updatedworstCaseScenario;

};

// Delete Worst case Scenario Service
export const deleteworstCaseScenarioService = async (financial_forecast_id: string) => {

    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    })  

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    await prisma.worstCaseScenario.deleteMany({
        where: {
            financialForecastId: financial_forecast_id
        }
    });

    return { message: 'Worst case scenario deleted successfully.' };
};