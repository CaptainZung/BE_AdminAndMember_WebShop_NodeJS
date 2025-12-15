const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const createAdmin = (data)=>{
    return prisma.user.create({data: data})
}
const getAdmin = ()=>{
    return prisma.user.findMany()
}
const deleteUser = (id) =>{
    return prisma.user.delete({where : {id : id}})
}
const updateUser = (id, data) =>{
    return prisma.user.update({where : {id : id}, data})
}
const getUserById = (id,data) =>{
    return prisma.user.findUnique({where : {id},data})
}

// const checkLogin = (data)=>{
//     return 
// }


module.exports = {
    createAdmin,
    // checkLogin
    getAdmin,
    deleteUser,
    updateUser,
    getUserById
}