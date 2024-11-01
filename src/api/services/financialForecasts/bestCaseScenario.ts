// Adjust the import according to your project structure
import prisma from "../../../config/db";
import error from "../../../utils/error";
import { generateBestCaseScenarioData } from "../../../utils/helpers/financialForecastHelpers/bestCaseScenario";


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

// Create Best Case Scenario Service
export const createBestCaseScenarioService = async (financial_forecast_id: string, inputData: object) => {
    
    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    })

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    let bestCaseScenario  = await prisma.bestCaseScenario.findFirst({
        where:{
            financialForecastId:financial_forecast_id
        }
    })

    if(bestCaseScenario){
        throw error('Best case scenario data already exists. Please update or delete the existing data to create a new one.');
    }

    const bestCaseScenarioData = await generateBestCaseScenarioData(inputData);
    const mappedData = mapItems(bestCaseScenarioData);

    const createData = mappedData.map(item => ({
        financialForecastId: financial_forecast_id,
        name: item.name,
        FY1: item.FY1,
        FY2: item.FY2,
        FY3: item.FY3,
        FY4: item.FY4,
        FY5: item.FY5
    }));

    const batchPayload = await prisma.bestCaseScenario.createMany({
        data: createData
    });

    if(batchPayload.count === 0){
        throw error('There is an error creating bestCaseScenario', 500);
    }   

    return batchPayload;
};

// Get Best Case Scenario Service
export const getBestCaseScenarioService = async (financial_forecast_id: string) => {

    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    })

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    const bestCaseScenario = await prisma.bestCaseScenario.findMany({
        where:{
            financialForecastId:financial_forecast_id
        },
    })

    if (bestCaseScenario.length === 0) {
        throw error('Best case scenario not found.', 404);
    }

    return bestCaseScenario;
};

// Update Best Case Scenario Service
interface BestCaseScenarioInput {
    bestCaseScenario: {
        id: string;
        name: string;
        FY1: number;
        FY2: number;
        FY3: number;
        FY4: number;
        FY5: number;
    }[];
}

export const updateBestCaseScenarioService = async (financial_forecast_id: string, inputData: BestCaseScenarioInput) => {
 
    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    })  

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    const updatedBestCaseScenario = await Promise.all(inputData.bestCaseScenario.map(async (scenario) => {
        const existingRecord = await prisma.bestCaseScenario.findUnique({
            where: {
                id: scenario.id,
                financialForecastId:financial_forecast_id
            },
        });

        if (!existingRecord) {
            throw error(`Record with id ${scenario.id} not found.`, 404);
        }

        return await prisma.bestCaseScenario.update({
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

    return updatedBestCaseScenario;

};

// Delete Best Case Scenario Service
export const deleteBestCaseScenarioService = async (financial_forecast_id: string) => {

    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    })  

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    await prisma.bestCaseScenario.deleteMany({
        where: {
            financialForecastId: financial_forecast_id
        }
    });

    return { message: 'Best case scenario deleted successfully.' };
};