const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient

const validateMember = async(data,file)=>{
    const errors = {}
     if(!data.name){
        errors.name = ' vui long nhap ten'
    }
    if(!data.email){
        errors.email = 'vui long nhap mail'
    }else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(data.email)){
        errors.email = 'sai dinh dang'
    }else{
        const existEmail = await prisma.user.findUnique({where :{ email : data.email}})
        if(existEmail){
            errors.email = 'da ton tai mail nay'
        }
    }
    }
    if(!data.password){
        errors.password = 'vui long nhap mat khau'
    }
    if(!data.phone){
        errors.phone = 'vui long nhap sdt'
    }else if(!/^\d+$/.test(data.phone)){
        errors.phone = 'sdt chi duoc nhap so'
    }
    if(!data.address){
        errors.address = 'vui long nhap dia chi'
    }
    if(file){
        const allowedFormats = ['image/jpeg', 'image/png','image/gif','image/jpg'];
        if(!allowedFormats.includes(file.mimetype)){
            errors.avatar = 'Dinh dang file ko hop le'
        }
        const maxSize = 1024*1024
        if(file.maxSize > maxSize){
            errors.file = 'file qua lon'
        }

    }
    return errors
}
const validateLogin = async(data)=>{
    const errors ={}
    const existAccount = await prisma.user.findFirst({where : {email : data.email, password : data.password}})
    if(!existAccount){
        errors.existAccount = 'sai mat khau hoac tai khoan'
    }
    return errors
}

module.exports = {
    validateMember,
    validateLogin
}