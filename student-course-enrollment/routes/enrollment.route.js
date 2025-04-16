const router=require('express').Router()

const enrollmentController=require('../controllers/enrollment.controller')


router.post('/create',enrollmentController.createEnrollment)
router.get('/list',enrollmentController.enrollmentList)



module.exports=router