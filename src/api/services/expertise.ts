
import prisma from "../../config/db"
import error from "../../utils/error"

export const createExpertiseService = async (image_url:string, name:string, price_per_hour:number) => {
    
  

   let expertise = await prisma.expertise.create({
     data:{
        imageUrl: image_url,
        name:name,
        pricePerHour:price_per_hour
     }
   })

   if(!expertise) {
    throw error('Failed to create expertise', 400)
   }

   return expertise

}
export const getAllExpertiseService = async () => {
    const expertises = await prisma.expertise.findMany()

    if (expertises.length == 0) {
        throw error('No expertise list found', 404);
    }

    return expertises
}


export const updateExpertiseService = async (image_url: string, name: string, price_per_hour: number, expertise_id: string) => {

   
    let expertise = await prisma.expertise.findUnique({
        where:{
            id:expertise_id
        }
    })

    if(!expertise){
        throw error('No expertise found with the given ID', 404)
    }

    expertise = await prisma.expertise.update({
        where:{
            id: expertise_id
        },
        data:{
            name: name,
            imageUrl:image_url,
            pricePerHour: price_per_hour
        }
    })

    return expertise
}
export const deleteExpertiseService = async (expertise_id:string) => {
        
    let expertise = await prisma.expertise.findUnique({
        where:{
            id:expertise_id
        }
    })

    if(!expertise){
        throw error('No expertise found with the given ID', 404)
    }

    expertise = await prisma.expertise.delete({
        where:{
            id: expertise_id
        }
    })
    return expertise
    
}








