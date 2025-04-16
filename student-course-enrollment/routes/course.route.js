const router=require('express').Router()

const courseController=require('../controllers/course.controller')


router.post('/create',courseController.createCourse)
router.get('/list',courseController.courseList)



module.exports=router