import prisma from "../../config/db"
import error from "../../utils/error"

export const getallCompaniesService= async (author_id:string) => {

    const companies = await prisma.companies.findMany({
        where:{
            userId:author_id
        }
    })

    if(companies.length == 0){
            throw error('No companies found for the given user ID', 404);
    }

    return companies
}

export const getSingleCompanieService= async (company_id:string) => {

    const company = await prisma.companies.findUnique({
        where:{
            id: company_id
        },
        include:{
            buisnessPlan:true,
            financialForecast:true,
            pitchDeck:true,
            user:true
        }
    })

    if (!company){
        throw error('There is no company related to this id', 400)
    }

    return company;
}

export const createCompanyService = async (company_title:string, image:string, description:string, author_id:string) => {
 
    
     const newCompany = await prisma.companies.create({
        data:{
            title:company_title,
            image: image,
            description:description,
            user:{
                connect:{
                    id: author_id
                }
            }
        }
    })

    if(!newCompany) {
        throw error('Company is not created', 500)
    }

    return newCompany
} 

export const updateCompanyService = async (company_id:string, image:string, description:string, compnay_title: string) => {

    const company = await prisma.companies.findUnique({
        where:{
            id:company_id
        }
    })

    if(!company) {
        throw error('Company not found for the given ID', 404)
    }

    const updatedCompany = await prisma.companies.update({
        where: {
            id: company_id
        },
        data:{
            title: compnay_title,
            image: image,
            description: description
        }
    });
    
    return updatedCompany;
} 


export const deleteCompanyService = async (company_id:string) => {

   
    const company = await prisma.companies.findUnique({
        where:{
            id:company_id
        }
    })

    
    if(!company) {
        throw error('Company not found for the given ID', 404)
    }
    
   const deletedCompany = await prisma.companies.delete({
    where:{
        id: company_id
    }
   })

    return deletedCompany ;
} 




