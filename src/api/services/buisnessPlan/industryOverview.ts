import prisma from "../../../config/db"
import error from "../../../utils/error"

import { generateIndustryDescription, generateMarketNeeds, generateMarketSegmentation, generateMarketTrends } from "../../../utils/helpers/buisnessPlanHelpers/industryOverview";


export const createindustryOverviewService = async (buisness_plan_id:string, inputData:object) => {

    const industry_description = await generateIndustryDescription(inputData);
    const market_needs = await generateMarketNeeds(inputData);
    const market_trends = await generateMarketTrends(inputData);
    const market_segmentation = await generateMarketSegmentation(inputData);


    // if(!problem_statement || !proposed_solution || !value_proposition || three_years_objective || keys_to_success) {
    //     throw error('All fields are required: problem_statement, proposed_solution, value_proposition, three_years_objective, keys_to_success', 400)
    // }

    let industryOverview = await prisma.industryOverview.findUnique({
        where:{
            buisnessplanId: buisness_plan_id
        }
    })

    if(industryOverview){
        throw error('An industry overview already exists for this user; creating a new one is not allowed', 404);
    } 
    
     industryOverview = await prisma.industryOverview.create({
        data:{
            industryDescription:industry_description as string,
            marketNeeds:market_needs as string,
            marketSegementation:market_segmentation as string,
            marketTrends:market_trends as string,
            buisnessPlan:{
                connect:{
                    id: buisness_plan_id
                }
            }
        },
    })

    return industryOverview
}

export const getindustryOverviewService = async (buisness_plan_id:string) => {

    if(!buisness_plan_id) {
        throw error('Id is not given. Please provide an id.', 400)
    }

    const industryOverview =  await prisma.industryOverview.findUnique({
        where:{
            buisnessplanId:buisness_plan_id
        }
    })

    if(!industryOverview){
        throw error('industry overview doest not exist in this id', 404)
    }
    
    return industryOverview
}

export const updateindustryOverviewService =  async (industry_description:string, market_needs:string, market_trends:string, market_segmentation:string,  industry_overview_id:string) => {
    
    const industryOverview =  await prisma.industryOverview.findUnique({
        where:{
            id:industry_overview_id,
        }
    })

    if(!industryOverview){
        throw error('No industry overview found for the provided ID', 404);
    }

    const updatedindustryOverview = await prisma.industryOverview.updateMany({
        where:{
            id:industry_overview_id
        },
        data:{
           industryDescription:industry_description,
           marketNeeds:market_needs,
           marketSegementation:market_segmentation,
           marketTrends:market_trends
        }
    })
    return updatedindustryOverview;
}


export const deleteindustryOverviewService = async (industry_overview_id:string) => {
        
    let industryOverview =  await prisma.industryOverview.findUnique({
        where:{
            id:industry_overview_id,
        }
    })

    if(!industryOverview){
        throw error('No industry overview found for the provided ID', 404);
    }
        
        industryOverview = await prisma.industryOverview.delete({
            where:{
                id:industry_overview_id
            }
        })
        
        return industryOverview;
}
