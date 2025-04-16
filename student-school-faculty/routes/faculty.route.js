const router=require('express').Router()

const facultyController=require('../controllers/faculty.controller')


router.post('/create',facultyController.createfaculty)
router.get('/list',facultyController.facultyList)



module.exports=router