import prisma from "../../../config/db"
import error from "../../../utils/error"
import { generateMission, generateOverView, generateProducts, generateValues, generateVision } from "../../../utils/helpers/buisnessPlanHelpers/companyDescription";


export const createCompanyDescriptionService = async (buisness_plan_id:string, inputData:object) => {

    const overview = await generateOverView(inputData);
    const products = await generateProducts(inputData);
    const mission = await generateMission(inputData);
    const Vision = await generateVision(inputData);
    const values = await generateValues(inputData);

    // if(!problem_statement || !proposed_solution || !value_proposition || three_years_objective || keys_to_success) {
    //     throw error('All fields are required: problem_statement, proposed_solution, value_proposition, three_years_objective, keys_to_success', 400)
    // }

    let companyDescription = await prisma.companyDescription.findUnique({
        where:{
            buisnessplanId: buisness_plan_id
        }
    })

    if(companyDescription){
        throw error('User already have Executive Summary you cant create a new one', 404)
    } 
    
     companyDescription = await prisma.companyDescription.create({
        data:{
            overview: overview as string,
            values: values as string,
            mission: mission as string,
            vision: Vision as string,
            products: products as string,
            buisnessPlan:{
                connect:{
                    id: buisness_plan_id
                }
            }
        },
    })

  
    return companyDescription
}

export const getCompanyDescriptionService = async (buisness_plan_id:string) => {

    if(!buisness_plan_id) {
        throw error('Id is not given. Please provide an id.', 400)
    }

    const companyDescription =  await prisma.companyDescription.findUnique({
        where:{
            buisnessplanId:buisness_plan_id
        }
    })

    if(!companyDescription){
        throw error('Company description doest not exist in this id', 404)
    }
    
    return companyDescription
}

export const updateCompanyDescriptionService =  async (overview:string, products:string, mission:string, vision:string, values:string, company_description_id:string) => {
    
    const companyDescription =  await prisma.companyDescription.findUnique({
        where:{
            id:company_description_id,
        }
    })

    if(!companyDescription){
        throw error('Company description doest not exist in this id', 404)
    }

    const updatedCompanyDescription = await prisma.companyDescription.updateMany({
        where:{
            id:company_description_id
        },
        data:{
           overview:overview,
           products:products,
           mission:mission,
           vision:vision,
           values:values
        }
    })

   

    return updatedCompanyDescription;
}

export const deleteCompanyDescriptionService = async (company_description_id:string) => {
        
        let companyDescription =  await prisma.companyDescription.findUnique({
            where:{
                id:company_description_id,
            }
        })

        if(!companyDescription){
            throw error('Company description doest not exist in this id', 404)
        }
         companyDescription = await prisma.companyDescription.delete({
            where:{
                id:company_description_id
            }
        })

        return companyDescription;
}
