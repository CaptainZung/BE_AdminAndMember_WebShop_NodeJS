const express = require('express')
const router = express.Router();
const adminController = require('./controllers/adminController')
const blogController = require('./controllers/blogController')
const countryController = require('./controllers/countryController')
const memberController = require('./controllers/memberController')
//user,admin
router.post('/admin/user/register', adminController.upload, adminController.createAdmin)

router.post('/admin/user/login',adminController.loginAdmin)

router.get('/admin/user/list',adminController.getAdmin)

router.delete('/admin/user/delete/:id', adminController.deleteUser)

router.post('/admin/user/update/:id', adminController.upload, adminController.updateUser)

router.get('/admin/user/:id', adminController.getUserById)
//blog
router.post('/admin/blog/add',blogController.upload, blogController.createBlog)

router.get('/admin/blog/list',blogController.getBlog)

router.get('/admin/blog/:id',blogController.getBlogById)

router.post('/admin/blog/edit/:id',blogController.upload, blogController.updateBlog)

router.delete('/admin/blog/delete/:id', blogController.deleteBlog)

//country
router.post('/admin/country/add',countryController.createCountry)
router.get('/country/list',countryController.listCountry)



//member
router.post('/member/register', memberController.upload,memberController.createMember )

router.post('/member/login', memberController.loginMember)

module.exports = router