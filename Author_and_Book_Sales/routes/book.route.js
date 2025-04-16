const router=require('express').Router()

const bookController=require('../controllers/book.controller')


router.post('/create',bookController.createbook)
router.get('/list',bookController.bookList)



module.exports=router