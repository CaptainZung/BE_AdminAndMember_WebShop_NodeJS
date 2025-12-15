const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const validateAdmin = async(data = {},file) =>{
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
        errors.password = 'vui long nhap mk'
    }
    if(!data.phone){
        errors.phone = 'vui long nhap sdt'
    }else if(!/^\d+$/.test(data.phone)){
        errors.phone = 'sdt chi duoc nhap so'
    }
    if(!data.address){
        errors.address = 'vui long nhap dia chi'
    }
    if(!data.id_country){
        errors.country = 'vui long nhap country'
    }
    if(!file){
        errors.avatar = 'vui long them anh'
    }else {
        const allowedFormats = ['image/jpeg', 'image/png', 'image/gif','image/jpg'];
        if(!allowedFormats.includes(file.mimetype)){
            errors.avatar = 'Dinh dang file ko hop le. Chi chap nhan JPEG,PNG hoac GIF';
        }
        //kiem tra dung luong cua file
        const maxSize = 1024 * 1024;//1mb
        if(file.size > maxSize){
            errors.avatar = 'DUng luong qua lon ,chon file <1mb'
        }
    }


    return errors
}
const validateLogin = async(data)=>{
    const errors = {}
    const existAccount = await prisma.user.findFirst({where : { email : data.email,password : data.password, level : data.level}})
    if(!existAccount){
        errors.account = 'sai tai khoan hoac mat khau'
    }else if (existAccount.level !== 1) {
        errors.account = 'Bạn không phải admin'
    }

    return errors
}


module.exports = 
    {validateAdmin,
    validateLogin}
