// Adjust the import according to your project structure
import prisma from "../../../config/db";
import error from "../../../utils/error";
import { generateRevenueAssumptiondata } from "../../../utils/helpers/financialForecastHelpers/revenueAssumption";




// Create Revenue Assumption Service
export const createRevenueAssumptionService = async (financial_forecast_id: string, inputData: object) => {
    
    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    });

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    let revenueAssumption = await prisma.revenueAssumption.findFirst({
        where:{
            financialForecastId: financial_forecast_id
        }
    });

    if(revenueAssumption){
        throw error('Revenue assumption data already exists. Please update or delete the existing data to create a new one.');
    }

    const revenueAssumptionData = await generateRevenueAssumptiondata(inputData);
    
  
    for (const item of revenueAssumptionData.revenueLineItem) {
        const { name, pricePerUnit, data } = item;
    
        await prisma.revenueAssumption.create({
            data: {
                name,
                pricePerUnit,
                financialForecast: {
                    connect: { id: financial_forecast_id }
                },
                revenueAssumptionItems: {
                    create: data.map(d => ({
                        unitName: d.unitName,
                        FY1: d.FY1,
                        FY2: d.FY2,
                        FY3: d.FY3,
                        FY4: d.FY4,
                        FY5: d.FY5,
                    }))
                }
            }
        });
    }
    

    return revenueAssumptionData
};

// Get Revenue Assumption Service
export const getRevenueAssumptionService = async (financial_forecast_id: string) => {

    let financialForecast = await prisma.financialForecast.findUnique({
        where: {
            id: financial_forecast_id
        }
    });

    if (!financialForecast) {
        throw new Error('No financial forecast found for this ID. Please create a financial forecast first.');
    }

    const revenueAssumption = await prisma.revenueAssumption.findMany({
        where: {
            financialForecastId: financial_forecast_id,
        },
        include:{
            revenueAssumptionItems:true
        }
        
        
    });

    if (!revenueAssumption) {
        throw new Error('No revenue assumption found for this financial forecast ID.');
    }

    return revenueAssumption;


};

// Update Revenue Assumption Service
interface RevenueAssumptionInput {
    revenueAssumption: {
        id: string;
        name: string;
        FY1: number;
        FY2: number;
        FY3: number;
        FY4: number;
        FY5: number;
    }[];
}

export const updateRevenueAssumptionService = async (financial_forecast_id: string, inputData: RevenueAssumptionInput) => {
 
    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    });

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }


    // const updatePromises = inputData.revenueAssumption.map((item: any) => {
    //     return prisma.revenueAssumption.upsert({
    //         where: { id: item.id, financialForecastId:financial_forecast_id },
    //         update: {
    //             name: item.name,
    //             pricePerUnit: item.pricePerUnit,
    //             FY1: item.FY1,
    //             FY2: item.FY2,
    //             FY3: item.FY3,
    //             FY4: item.FY4,
    //             FY5: item.FY5,
              
    //         },
    //         create: {
    //             id: item.id,
    //             name: item.name,
    //             pricePerUnit: item.pricePerUnit,
    //             FY1: item.FY1,
    //             FY2: item.FY2,
    //             FY3: item.FY3,
    //             FY4: item.FY4,
    //             FY5: item.FY5,
    //             financialForecastId: financial_forecast_id
    //         }
    //     });
    // });

    // const updatedRevenueAssumptions = await Promise.all(updatePromises);
    return {};
};

// Delete Revenue Assumption Service
export const deleteRevenueAssumptionService = async (financial_forecast_id: string) => {

    let financialForecast = await prisma.financialForecast.findUnique({
        where:{
            id: financial_forecast_id
        }
    });

    if (!financialForecast) {
        throw error('No financial forecast found for this ID. Please create a financial forecast first.', 404);
    }

    await prisma.revenueAssumption.deleteMany({
        where: {
            financialForecastId: financial_forecast_id
        }
    });

    return { message: 'Revenue assumption deleted successfully.' };
};