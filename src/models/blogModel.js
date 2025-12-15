const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const createBlog = async(data) =>{
    return prisma.blog.create({data : data})
}
const getBlog = async ()=>{
    return prisma.blog.findMany()
}
const getBlogById =(id) =>{
    return prisma.blog.findUnique({where :{id : id}})
}
const updateBlog = async(id,data) =>{
    return prisma.blog.update({where : {id : id},data})
}
const deleteBlog = (id) =>{
    return prisma.blog.delete({where : {id : id}})
}
module.exports = {
    createBlog,
    getBlog,
    updateBlog,
    deleteBlog,
    getBlogById
}