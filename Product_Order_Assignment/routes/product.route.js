const router=require('express').Router()

const productController=require('../controllers/product.controller')


router.post('/create',productController.CreateProduct)
router.get('/list',productController.productList)



module.exports=router