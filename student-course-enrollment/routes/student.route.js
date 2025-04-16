const router=require('express').Router()

const studentController=require('../controllers/student.controller')


router.post('/create',studentController.createStudent)
router.get('/list',studentController.studentList)



module.exports=router