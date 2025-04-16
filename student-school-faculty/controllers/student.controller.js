const studentModel = require("../models/student.model");
const facultyModel=require('../models/faculty.model')

class studentController {
  async createStudent(req, res) {
    try {
      const { name,phone,facultyId} = req.body;

      if (!name || !phone || !facultyId) {
        return res.status(400).json({
          success: false,
          message: "All feild Required ",
        });
      }
      let isPhoneExist=await studentModel.findOne({phone})
    
      if(isPhoneExist){
        return res.status(400).json({
          success: false,
          message: "phone already Exits ",
        });
      }
          let isfacultyIdExist= await facultyModel.findOne({_id:facultyId})
            if(!isfacultyIdExist){
              return res.status(400).json({
                status: "false",
                message: "faculty_Id Not Found",
              });
            }
      
      const student = await studentModel.create({
        name,phone,facultyId
      });

      if (student) {
        return res.status(200).json({
          success: true,
          message: "student Created Sucessfully",
          student,
        });
      }
    } catch (e) {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
      });
      throw e;
    }
  }

  async studentList(req, res) {
    
       try {
      let student = await studentModel.aggregate([
        {
          $match: {
            isDeleted: false,
          },
        },
        {
          $lookup: {
            from: "faculties",
            localField: "facultyId",
            foreignField: "_id",
            as: "facultyDetails",
          },
        },
        {
          $unwind: "$facultyDetails",
        },
        {
          $lookup: {
            from: "schools",
            localField: "facultyDetails.schoolId",
            foreignField: "_id",
            as: "schoolDetails",
          },
        },
      
      
        {
          $unwind: "$schoolDetails",
        },

        {
          $project: {
           
            studentName: "$name",
            StudentphoneNo:"$phone",
            facultyName:"$facultyDetails.name",
            schoolName:"$schoolDetails.name"
        
            
           
          },
        },
     
      
     
        
      ]);

      if (student) {
        return res.status(200).json({
          status: true,
          message: "school List",
          totalschool: student.length,
          studentDetails: student,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "Something Went Wrong",
      });
      throw error;
    }
  
  }
}

module.exports = new studentController();
