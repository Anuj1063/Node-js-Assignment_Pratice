const router=require('express').Router()

const schoolController=require('../controllers/school.controller')


router.post('/create',schoolController.createschool)
router.get('/list',schoolController.schoolList)



module.exports=router