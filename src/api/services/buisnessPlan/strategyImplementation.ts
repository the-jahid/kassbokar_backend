import prisma from "../../../config/db"
import error from "../../../utils/error"
import { generateManageMentTeam, generatePestleAnalysis, generateSwotAnalysis } from "../../../utils/helpers/buisnessPlanHelpers/strategyImplementation";


export const createStrategyImplementationService = async (buisness_plan_id:string, inputData:object) => {

    const management_team = await generateManageMentTeam(inputData);
    const swot_analysis = await generateSwotAnalysis(inputData);
    const pestle_analysis = await generatePestleAnalysis(inputData);


    let StrategyImplementation = await prisma.strategy.findUnique({
        where:{
            buisnessplanId: buisness_plan_id
        }
    })

    if(StrategyImplementation){
        throw error('User already have strategy implementation you cant create a new one', 404)
    } 
    
     StrategyImplementation = await prisma.strategy.create({
        data:{
            managementTeam:management_team as string,
            pestleAnalysis:pestle_analysis as string,
            swotAnalysis:swot_analysis as string,
            buisnessPlan:{
                connect:{
                    id: buisness_plan_id
                }
            }
        },
    })

    return StrategyImplementation
}

export const getStrategyImplementationService = async (buisness_plan_id:string) => {

    if(!buisness_plan_id) {
        throw error('Id is not given. Please provide an id.', 400)
    }

    const StrategyImplementation =  await prisma.strategy.findUnique({
        where:{
            buisnessplanId:buisness_plan_id
        }
    })

    if(!StrategyImplementation){
        throw error('No strategy implementation exists for the provided ID', 404);
    }
    
    return StrategyImplementation
}

export const updateStrategyImplementationService =  async (management_team:string, swot_analysis:string, pestle_analysis:string, strategy_implementation_id:string) => {
    
    const StrategyImplementation =  await prisma.strategy.findUnique({
        where:{
            id:strategy_implementation_id,
        }
    })

    if(!StrategyImplementation){
        throw error('No strategy implementation found for the provided ID', 404);
    }

    const updatedStrategyImplementation = await prisma.strategy.updateMany({
        where:{
            id:strategy_implementation_id
        },
        data:{
            managementTeam: management_team,
            swotAnalysis: swot_analysis,
            pestleAnalysis:pestle_analysis
        }
    })
    return updatedStrategyImplementation;
}


export const deleteStrategyImplementationService = async (strategy_implementation_id:string) => {

        let StrategyImplementation =  await prisma.strategy.findUnique({
            where:{
                id:strategy_implementation_id,
            }
        })

        if(!StrategyImplementation){
            throw error('No strategy implementation found for the provided ID', 404);
        }

         StrategyImplementation = await prisma.strategy.delete({
            where:{
                id:strategy_implementation_id
            }
        })
        
        return StrategyImplementation;
}
