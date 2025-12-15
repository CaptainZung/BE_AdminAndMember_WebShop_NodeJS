const multer = require('multer')
const validate = require('../validation/memberValidation')
const memberModels = require('../models/memberModel')
const jwt = require('jsonwebtoken')

const storage = multer.diskStorage({
    destination : (req,file,cb)=>{
        cb(null, 'public/uploads/member')
    },
    filename : (req,file,cb)=>{
        cb(null, file.originalname)
    }
})

function createJWT(userId,username){
    const token = jwt.sign({userId, username},'huynh-dung',{expiresIn :'5h'})
    return token
}



const upload = multer({storage}).single('avatar')

const createMember = async(req,res)=>{
    const data = req.body
    const file = req.file
    const errors = await validate.validateMember(data,file)
    if(Object.keys(errors).length>0){
        return res.status(400).json(errors)
    }
    if(data.id_country){
        data.id_country = parseInt(data.id_country)
    }
    
        data.level = parseInt(data.level)
    let imageName = ''
    if(file){
        imageName = file.path
    }
    data.avatar = imageName
    const createMember = await memberModels.createMember(data)
    res.json(createMember)
}
const loginMember = async(req,res)=>{
    const data = req.body
    const errors = await validate.validateLogin(data)
    if(Object.keys(errors)>0){
        return res.status(400).json(errors)
    }
    // const token = createJWT()
    res.status(200).json('dang nhap thanh cong')
}

module.exports = {
    upload,
    createMember,
    loginMember
}