 // Adjust the import according to your project structure

import prisma from "../../../config/db";



// Create Revenue Forecast Service
export const createRevenueForecastService = async (financial_forecast_id: string, inputData: object) => {
    // let revenueForecast = await prisma.revenueForecast.findUnique({
    //     where: {
    //         financialForecastId:financial_forecast_id
    //     }
    // });

    // if (revenueForecast) {
    //     throw new Error('A revenue forecast already exists. You can either update it or delete it to make new changes.');
    // }

    // const {
    //     revenue,
    //     cost_of_goods_sold,
    //     gross_profit,
    //     operating_expenses,
    //     net_profit
    // } = inputData;

    // revenueForecast = await prisma.revenueForecast.create({
    //     data: {
    //         revenue: revenue,
    //         costOfGoodsSold: cost_of_goods_sold,
    //         grossProfit: gross_profit,
    //         operatingExpenses: operating_expenses,
    //         netProfit: net_profit,
    //         financialForecast: {
    //             connect: {
    //                 id: financial_forecast_id
    //             }
    //         }
    //     }
    // });

    // return revenueForecast;
};

// Get Revenue Forecast Service
export const getRevenueForecastService = async (financial_forecast_id: string) => {
    // const revenueForecast = await prisma.revenueForecast.findUnique({
    //     where: {
    //         financialForecastId: financial_forecast_id
    //     }
    // });

    // if (!revenueForecast) {
    //     throw new Error('Revenue forecast not found.');
    // }

    // return revenueForecast;
};

// Update Revenue Forecast Service
export const updateRevenueForecastService = async (revenue_forecast_id: string, inputData: object) => {
    // let revenueForecast = await prisma.revenueForecast.findUnique({
    //     where: {
    //         id: revenue_forecast_id
    //     }
    // });

    // if (!revenueForecast) {
    //     throw new Error('Revenue forecast not found.');
    // }

    // const {
    //     revenue,
    //     cost_of_goods_sold,
    //     gross_profit,
    //     operating_expenses,
    //     net_profit
    // } = inputData;

    // revenueForecast = await prisma.revenueForecast.update({
    //     where: {
    //         id: revenue_forecast_id
    //     },
    //     data: {
    //         revenue: revenue,
    //         costOfGoodsSold: cost_of_goods_sold,
    //         grossProfit: gross_profit,
    //         operatingExpenses: operating_expenses,
    //         netProfit: net_profit
    //     }
    // });

    // return revenueForecast;
};

// Delete Revenue Forecast Service
export const deleteRevenueForecastService = async (revenue_forecast_id: string) => {
    const revenueForecast = await prisma.revenueForecast.findUnique({
        where: {
            id: revenue_forecast_id
        }
    });

    if (!revenueForecast) {
        throw new Error('Revenue forecast not found.');
    }

    await prisma.revenueForecast.delete({
        where: {
            id: revenue_forecast_id
        }
    });

    return { message: 'Revenue forecast deleted successfully.' };
};