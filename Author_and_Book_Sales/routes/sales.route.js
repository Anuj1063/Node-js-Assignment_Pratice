const router=require('express').Router()

const saleController=require('../controllers/sales.controller')


router.post('/create',saleController.createSale)
router.get('/list',saleController.saleList)



module.exports=router