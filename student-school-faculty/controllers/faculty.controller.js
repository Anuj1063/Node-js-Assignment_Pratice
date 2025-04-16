const facultyModel = require("../models/faculty.model");
const schoolModel=require('../models/school.model')

class facultyController {
  async createfaculty(req, res) {
    try {
      const { name,phone,schoolId } = req.body;
      if (!name || !phone || !schoolId) {
        res.status(400).json({
          message: "All Feild are required",
        });
      }
      let ifFacultyExist = await facultyModel.findOne({ phone });
      if (ifFacultyExist) {
        return res.status(400).json({
          status: "sucess",
          message: "faculty Already Exist",
        });
      }
         let isSchoolIdExist= await schoolModel.findOne({_id:schoolId})
      if(!isSchoolIdExist){
        return res.status(400).json({
          status: "false",
          message: "school_Id Not Found",
        });
      }

      const faculty = await facultyModel.create({ name,phone,schoolId });
      if (faculty) {
        res.status(200).json({
          status: "sucess",
          message: "faculty Created SucessFully!!",
          faculty,
        });
      } else {
        res.status(400).json({
          message: "Failed To Create faculty",
        });
      }
    } catch (error) {
      throw error;
    }
  }
  async facultyList(req, res) {
    try {
      const faculty = await facultyModel.find({isDeleted:false});
      if (faculty) {
        return res.status(200).json({
          success: true,

          totalfaculty: faculty.length,
          faculty,
        });
      }
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new facultyController();
