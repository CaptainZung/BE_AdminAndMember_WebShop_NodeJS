const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const createCountry = (data) =>{
    return prisma.country.create({data : data})
}
const listCountry = ()=>{
    return prisma.country.findMany()
}
module.exports = {
    createCountry,
    listCountry
}