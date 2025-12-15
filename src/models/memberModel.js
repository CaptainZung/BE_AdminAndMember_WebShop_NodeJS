const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const createMember = (data) =>{
    return prisma.user.create({data : data})
}

const loginMember = (data) =>{
    return prisma.user.findUnique({where : {}})
}

module.exports = {
    createMember
}
