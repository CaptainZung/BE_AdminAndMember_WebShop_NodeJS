const multer = require("multer")
const blogModel = require("../models/blogModel")
const blogValidation  = require("../validation/blogValidation")

const storage = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null, 'public/uploads/blog')
    },
    filename:(req,file,cb)=>{
        cb(null, file.originalname)
    }
})

const upload = multer({storage}).single('image')


const createBlog = async(req,res) =>{
    const data = req.body
    const file = req.file
    const errors = await blogValidation.validateBlog(data,file)
    if(Object.keys(errors).length>0){
        return res.status(400).json(errors);
    }
    let imageName = ''
    if(file){
        imageName = file.path
    }
    data.image = imageName
    const createBlog = await blogModel.createBlog(data)
    res.status(200).json(createBlog)
}
const getBlog = async(req,res) =>{
    const data = await blogModel.getBlog()
    res.json(data)
}
const updateBlog = async(req,res) =>{
    const id = parseInt(req.params.id)

    const file = req.body.file
    const data = {
        title : req.body.title,
        image : file,
        description : req.body.description,
        content : req.body.content
    }
    const updateBlog = await blogModel.updateBlog(id,data)
    res.status(200).json("Update thanh cong",updateBlog)
}
    const deleteBlog = async(req,res) =>{
        const id = parseInt(req.params.id)
        const deleteBlog = await blogModel.deleteBlog(id)
        res.status(200).json('Da xoa thanh cong')
    }
    const getBlogById = async(req,res) =>{
        const id = parseInt(req.params.id)
        const getBlogById = await blogModel.getBlogById(id)
        res.json(getBlogById)
    }
module.exports = {
    createBlog,
    upload,
    getBlog,
    updateBlog,
    deleteBlog,
    getBlogById
}