import prisma from "../../../config/db"
import error from "../../../utils/error"
import { generateCompetitors, generateCompetitveAdvantage } from "../../../utils/helpers/buisnessPlanHelpers/competitiveComparison";



export const createcompetitiveComparisonService = async (buisness_plan_id:string, inputData:object) => {

    const competitors = await generateCompetitors(inputData);
    const competitive_advantage = await generateCompetitveAdvantage(inputData);
   
    let competitiveComparison = await prisma.competitiveComparison.findUnique({
        where:{
            buisnessplanId: buisness_plan_id
        }
    })

    if (competitiveComparison) {
        throw error('A competitive comparison already exists for this user; creating a new one is not allowed', 400);
    }
    
     competitiveComparison = await prisma.competitiveComparison.create({
        data:{
           competitors:competitors as string,
           competitiveAdvantage:competitive_advantage as string,
            buisnessPlan:{
                connect:{
                    id: buisness_plan_id
                }
            }
        },
    })

  
    return competitiveComparison
}

export const getcompetitiveComparisonService = async (buisness_plan_id:string) => {

    if (!buisness_plan_id) {
        throw error('Competitive comparison ID is required. Please provide a valid ID.', 400);
    }

    const competitiveComparison =  await prisma.competitiveComparison.findUnique({
        where:{
            buisnessplanId:buisness_plan_id
        }
    })

    if(!competitiveComparison){
        throw error('Competitive Comparison doest not exist in this id', 404)
    }
    
    return competitiveComparison
}

export const updatecompetitiveComparisonService =  async (competitors:string, competitive_advantage:string, competitive_comparison_id:string) => {
    
    const competitiveComparison =  await prisma.competitiveComparison.findUnique({
        where:{
            id: competitive_comparison_id,
        }
    })

    if(!competitiveComparison){
        throw error('Competitive Comparison doest not exist in this id', 404)
    }

    const updatedcompetitiveComparison = await prisma.competitiveComparison.updateMany({
        where:{
            id:competitive_comparison_id
        },
        data:{
         competitors:competitors,
         competitiveAdvantage:competitive_advantage
        }
    })
    
    return updatedcompetitiveComparison;
}

export const deletecompetitiveComparisonService = async (competitive_comparison_id:string) => {
        
            let competitiveComparison =  await prisma.competitiveComparison.findUnique({
                where:{
                    id: competitive_comparison_id,
                }
            })

            if(!competitiveComparison){
                throw error('Competitive Comparison doest not exist in this id', 404)
            }

         competitiveComparison = await prisma.competitiveComparison.delete({
            where:{
                id:competitive_comparison_id
            }
        })

        return competitiveComparison;
}
