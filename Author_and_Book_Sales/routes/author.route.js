const router=require('express').Router()

const authorController=require('../controllers/author.controller')


router.post('/create',authorController.createauthor)
router.get('/list',authorController.authorList)



module.exports=router