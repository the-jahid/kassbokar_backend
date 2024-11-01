import prisma from "../../../config/db"
import error from "../../../utils/error";

import { generateKeysToSuccess, generateProblemStateMent, generateProposedSolution, generateThreeYearsObjective, generateValueProposition } from "../../../utils/helpers/buisnessPlanHelpers/executiveSummary"


export const createExecutiveSummaryService = async (buisness_plan_id:string, inputData:object) => {

    const problem_statement = await generateProblemStateMent(inputData);
    const proposed_solution = await generateProposedSolution(inputData);
    const value_proposition = await generateValueProposition(inputData);
    const three_years_objective = await generateThreeYearsObjective(inputData);
    const keys_to_success = await generateKeysToSuccess(inputData);

    // if(!problem_statement || !proposed_solution || !value_proposition || three_years_objective || keys_to_success) {
    //     throw error('All fields are required: problem_statement, proposed_solution, value_proposition, three_years_objective, keys_to_success', 400)
    // }

    let executiveSummary = await prisma.executiveSummary.findUnique({
        where:{
            buisnessplanId: buisness_plan_id
        }
    })

    if(executiveSummary){
        throw error('User already has an executive summary; creating a new one is not allowed', 404);
    } 
    
     executiveSummary = await prisma.executiveSummary.create({
        data:{
            ProblemStateMent: problem_statement as string,
            ProposedSolution: proposed_solution as string,
            ValueProposition: value_proposition as string,
            ThreeYearsObective: three_years_objective as string,
            KeysToSuccess: keys_to_success as string,
            buisnessPlan:{
                connect:{
                    id: buisness_plan_id
                }
            }
        },
    })

  
    return executiveSummary
}

export const getExecutiveSummaryService = async (buisness_plan_id:string) => {

    if(!buisness_plan_id) {
        throw error('Business plan ID is required. Please provide a valid ID.', 400);
    }

    const executiveSummary =  await prisma.executiveSummary.findUnique({
        where:{
            buisnessplanId:buisness_plan_id
        }
    })

    if(!executiveSummary){
       throw error('No executive summary found for the given ID', 404);
    }
    
    return executiveSummary
}

export const updateExecutiveSummaryService =  async (problem_statement:string, proposed_solution:string, value_proposition:string, three_years_objective:string, keys_to_success:string, executive_summary_id:string) => {
    
    const executiveSummary =  await prisma.executiveSummary.findUnique({
        where:{
            id:executive_summary_id,
        }
    })

    if(!executiveSummary){
        throw error('No executive summary exists for the provided ID', 404);
    }

    const updatedExecutiveSummary = await prisma.executiveSummary.updateMany({
        where:{
            id:executive_summary_id
        },
        data:{
            ProblemStateMent:problem_statement,
            ProposedSolution:proposed_solution,
            ValueProposition: value_proposition,
            ThreeYearsObective: three_years_objective,
            KeysToSuccess: keys_to_success,
        }
    })
    
    return updatedExecutiveSummary;
}

export const deleteExecutiveSummaryService = async (executive_summary_id:string) => {
    let executiveSummary =  await prisma.executiveSummary.findUnique({
        where:{
            id:executive_summary_id,
        }
    })

    if(!executiveSummary){
        throw error('No executive summary exists for the provided ID', 404);
    }

    executiveSummary = await prisma.executiveSummary.delete({
        where:{
            id:executive_summary_id
        }
    })

    return executiveSummary;
}
