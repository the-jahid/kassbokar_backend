import {Request, Response, NextFunction} from 'express'
import { generateKeysToSuccess, generateProblemStateMent, generateProposedSolution, generateThreeYearsObjective, generateValueProposition } from '../../../utils/helpers/buisnessPlanHelpers/executiveSummary'
import prisma from '../../../config/db';
import { generateMission, generateOverView, generateProducts, generateValues, generateVision } from '../../../utils/helpers/buisnessPlanHelpers/companyDescription';
import { generateCompetitors, generateCompetitveAdvantage } from '../../../utils/helpers/buisnessPlanHelpers/competitiveComparison';
import { generateIndustryDescription, generateMarketNeeds, generateMarketSegmentation, generateMarketTrends } from '../../../utils/helpers/buisnessPlanHelpers/industryOverview';
import { generateContentMarketingSEO, generateEducationalWebinarWorkshop, generateInfluencerMarketing, generateLocalizedDigitalMarketingCampaigns, generateStrategicPartnershipBuisnessIncubators } from '../../../utils/helpers/buisnessPlanHelpers/marketingPlan';
import { generateManageMentTeam, generatePestleAnalysis, generateSwotAnalysis } from '../../../utils/helpers/buisnessPlanHelpers/strategyImplementation';
import error from '../../../utils/error';

export const createBuisnessPlanService = async (inputData:object, company_id:string) => {
    

    const company = await prisma.companies.findUnique({
        where:{
            id: company_id
        }
    })

    if(!company) {
        throw error('No company Found on this id', 404)
    }


    let buisnessPlan  = await prisma.buisnessPlan.findFirst({
        where:{
            companyId: company_id
        }
    })
    

if (buisnessPlan) {
    throw error('A business plan has already been created', 409);
}
    const overview = await generateOverView(inputData);
    const mission = await generateMission(inputData);
    const vision = await generateVision(inputData);
    const values = await generateValues(inputData);
    const products = await generateProducts(inputData);
    const competitive_advantage = await generateCompetitveAdvantage(inputData);
    const competitors = await generateCompetitors(inputData);
    const keys_to_success = await generateKeysToSuccess(inputData);
    const problem_statement = await generateProblemStateMent(inputData);
    const proposed_solution = await generateProposedSolution(inputData);
    const three_years_objective = await generateThreeYearsObjective(inputData);
    const value_proposition = await generateValueProposition(inputData);
    const industry_description = await generateIndustryDescription(inputData);
    const market_needs = await generateMarketNeeds(inputData);
    const market_segmentation = await generateMarketSegmentation(inputData);
    const market_trends = await generateMarketTrends(inputData);
    const content_marketing_seo = await generateContentMarketingSEO(inputData);
    const educational_webinars_workshop = await generateEducationalWebinarWorkshop(inputData);
    const influencer_marketing = await generateInfluencerMarketing(inputData);
    const localized_digital_marketing_campaigns = await generateLocalizedDigitalMarketingCampaigns(inputData);
    const strategic_partnership_business_incubators = await generateStrategicPartnershipBuisnessIncubators(inputData);
    const management_team = await generateManageMentTeam(inputData);
    const pestle_analysis = await generatePestleAnalysis(inputData);
    const swot_analysis = await generateSwotAnalysis(inputData);
    

     buisnessPlan = await prisma.buisnessPlan.create({
        data:{
            companyDescription: {
                create: {
                    overview: overview as string,
                    mission: mission as string,
                    vision: vision as string,
                    values: values as string,
                    products: products as string
                }
            },
            competitiveComparison: {
                create: {
                    competitiveAdvantage: competitive_advantage as string,
                    competitors: competitors as string
                }
            },
            executiveSummary: {
                create: {
                    KeysToSuccess: keys_to_success as string,
                    ProblemStateMent: problem_statement as string,
                    ProposedSolution: proposed_solution as string,
                    ThreeYearsObective: three_years_objective as string,
                    ValueProposition: value_proposition as string
                }
            },
            industryOverview: {
                create: {
                    industryDescription: industry_description as string,
                    marketNeeds: market_needs as string,
                    marketSegementation: market_segmentation as string,
                    marketTrends: market_trends as string
                }
            },
            marketingPlan: {
                create: {
                    contentMarketingSeo: content_marketing_seo as string,
                    educationalWebinarsWorkshop: educational_webinars_workshop as string,
                    influencerMarketing: influencer_marketing as string,
                    localizedDigitalMarketingCampaigns: localized_digital_marketing_campaigns as string,
                    strategicPartnerShipBuisnessIncubators: strategic_partnership_business_incubators as string
                }
            },
            strategy: {
                create: {
                    managementTeam: management_team as string,
                    pestleAnalysis: pestle_analysis as string,
                    swotAnalysis: swot_analysis as string
                }
            },
            company:{
                connect:{
                    id:company_id
                }
            },  
        }
    })    

    if(!buisnessPlan){
        throw error('BuissnessPlan is not generate', 400)
    }

    return buisnessPlan;
}


export const getBuisnessPlanService = async (company_id:string) => {

   
     const busisnessPlan = await prisma.buisnessPlan.findUnique({
        where:{
            companyId: company_id,
          
        },
        include:{
            companyDescription:true,
            competitiveComparison:true,
            executiveSummary:true,
            industryOverview:true,
            marketingPlan:true,
            strategy:true
        }
     })  

     if(!busisnessPlan){
        throw error("Cant find Buisness Plan on this ID", 404)
     }

     return busisnessPlan

}

export const updateBuisnessPlanService = async (buisness_plan_id:string) => {

}


export const deleteBuisnessPlanService = async (buisness_plan_id:string) => {
    
    let buisnessPlan = await prisma.buisnessPlan.findUnique({
        where:{
            companyId: buisness_plan_id 
        }
    })
    
    if(!buisnessPlan){
        throw error('buisness plan not found on this id', 404)
    }

     buisnessPlan = await prisma.buisnessPlan.delete({
        where:{
            companyId:buisness_plan_id,
        }
    })
    
   

    return buisnessPlan
}



