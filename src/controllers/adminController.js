const adminModel = require('../models/adminModel')
const validateAdmin = require('../validation/adminValidation')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null, 'public/uploads/admin')
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname)
    }
})

const upload = multer({storage}).single('avatar')

const createAdmin = async(req,res)=>{
    const data = req.body
    const file =req.file
    
    console.log(data)
    if (data.id_country) {
    data.id_country = parseInt(data.id_country, 10);
  }
    const errors = await validateAdmin.validateAdmin(data,file);
    if(Object.keys(errors).length>0){
        return res.status(400).json(errors);
    }
    let avatarName = ''
    if(file){
        avatarName = file.path
    }
    data.avatar = avatarName    
    const admin = await adminModel.createAdmin(data)
    res.json(admin)
}

const loginAdmin = async (req,res) =>{
    const data = req.body
    const errors = await validateAdmin.validateLogin(data)
    if(Object.keys(errors).length>0){
        return res.status(400).json(errors)
    }
    res.status(200).json('dang nhap thanh cong')

}
const getAdmin = async(req,res) =>{
    const data = await adminModel.getAdmin()
    res.json(data)
}
const deleteUser = async(req,res) =>{
    const id = parseInt(req.params.id)
    const deleteUser = await adminModel.deleteUser(id)
    res.status(200).json('Da xoa')
}

const updateUser = async(req,res)=>{
    const id = parseInt(req.params.id)
        const file = req.body.file
    const data = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            address: req.body.address,
            id_country: Number(req.body.id_country),
            level: Number(req.body.level),
                avatar :file
            };

        const update = await adminModel.updateUser(id,data)
        res.status(200).json('Da cap nhat')
}

const getUserById = async(req,res)=>{
    const id = parseInt(req.params.id)
    const data = req.body
    const getUserById = await adminModel.getUserById(id,data)
    res.json(getUserById)
}

module.exports = {
    createAdmin,
    upload,
    loginAdmin,
    getAdmin,
    deleteUser,
    updateUser,
    getUserById
}