const router=require('express').Router()

const categoryController=require('../controllers/category.controller')


router.post('/create',categoryController.createcategory)
router.get('/list',categoryController.categoryList)



module.exports=router