const validateBlog = async (data , file) =>{
    const errors = {}
    if(!data.title){
        errors.title = 'vui long nhap title'
    }
    if(!file){
        errors.image = 'vui long them anh'
    }else {
        const allowedFormats = ['image/jpeg', 'image/png', 'image/gif','image/jpg'];
        if(!allowedFormats.includes(file.mimetype)){
            errors.image = 'Dinh dang file ko hop le. Chi chap nhan JPEG,PNG hoac GIF';
        }
        //kiem tra dung luong cua file
        const maxSize = 1024 * 1024;//1mb
        if(file.size > maxSize){
            errors.image = 'DUng luong qua lon ,chon file <1mb'
        }
    }
    return errors
}
module.exports = {
    validateBlog
}