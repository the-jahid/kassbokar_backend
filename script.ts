
import prisma from "./src/config/db"

async function main() {

   
    
}   

main()
    .then(async () => {
        await prisma.$disconnect()
       
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })




