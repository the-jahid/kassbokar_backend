import prisma from "../../../config/db"
import error from "../../../utils/error"
import { generateContentMarketingSEO, generateEducationalWebinarWorkshop, generateInfluencerMarketing, generateLocalizedDigitalMarketingCampaigns, generateStrategicPartnershipBuisnessIncubators } from "../../../utils/helpers/buisnessPlanHelpers/marketingPlan"




export const createmarketingPlanService = async (buisness_plan_id:string, inputData:object) => {

    const content_marketing_seo = await generateContentMarketingSEO(inputData);
    const educationl_webinar_workshop = await  generateEducationalWebinarWorkshop(inputData)
    const influencer_marketing =  await generateInfluencerMarketing(inputData)
    const localized_digital_marketing_campaigns = await generateLocalizedDigitalMarketingCampaigns(inputData)
    const strategic_partnership_buisness_incubators =  await generateStrategicPartnershipBuisnessIncubators(inputData);


    let marketingPlan = await prisma.marketingPlan.findUnique({
        where:{
            buisnessplanId: buisness_plan_id
        }
    })

    if(marketingPlan){
        throw error('User already have marketing plan you cant create a new one', 404)
    } 
    
     marketingPlan = await prisma.marketingPlan.create({
        data:{
            contentMarketingSeo:content_marketing_seo as string ,
            educationalWebinarsWorkshop:educationl_webinar_workshop as string,
            influencerMarketing:influencer_marketing as string,
            localizedDigitalMarketingCampaigns:localized_digital_marketing_campaigns as string,
            strategicPartnerShipBuisnessIncubators:strategic_partnership_buisness_incubators as string,
            
            buisnessPlan:{
                connect:{
                    id: buisness_plan_id
                }
            }
        },
    })

    return marketingPlan
}

export const getmarketingPlanService = async (buisness_plan_id:string) => {

    if(!buisness_plan_id) {
        throw error('Id is not given. Please provide an id.', 400)
    }

    const marketingPlan =  await prisma.marketingPlan.findUnique({
        where:{
            buisnessplanId:buisness_plan_id
        }
    })

    if(!marketingPlan){
        throw error('marketing plan doest not exist in this id', 404)
    }
    
    return marketingPlan
}

export const updatemarketingPlanService =  async (content_marketing_seo:string, educationl_webinar_workshop:string, localized_digital_marketing_campaigns:string, strategic_partnership_buisness_incubators:string, influencer_marketing:string,  marketing_plan_id:string) => {
    
    const marketingPlan =  await prisma.marketingPlan.findUnique({
        where:{
            id:marketing_plan_id,
        }
    })

    if(!marketingPlan){
        throw error('marketing plan doest not exist in this id', 404)
    }

    const updatedmarketingPlan = await prisma.marketingPlan.updateMany({
        where:{
            id:marketing_plan_id
        },
        data:{
           contentMarketingSeo:content_marketing_seo,
           educationalWebinarsWorkshop: educationl_webinar_workshop,
           localizedDigitalMarketingCampaigns: localized_digital_marketing_campaigns,
           strategicPartnerShipBuisnessIncubators:strategic_partnership_buisness_incubators,
           influencerMarketing: influencer_marketing
        }
    })
    return updatedmarketingPlan;
}


export const deletemarketingPlanService = async (marketing_plan_id:string) => {

        let marketingPlan =  await prisma.marketingPlan.findUnique({
            where:{
                id:marketing_plan_id,
            }
        })

        if(!marketingPlan){
            throw error('marketing plan doest not exist in this id', 404)
        }

        marketingPlan = await prisma.marketingPlan.delete({
            where:{
                id:marketing_plan_id
            }
        })
        
        return marketingPlan;
}
