
const schoolModel = require("../models/school.model");
// const studentModel=require('../models/student.model')
// const courseModel=require('../models/course.model')

class schoolController {
  async createschool(req, res) {
    try {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({
          status: false,
          Message: "name is  required!! ",
        });
      }
      // let isStudentIdExist= await studentModel.findOne({_id:studentId})
      // if(!isStudentIdExist){
      //   return res.status(400).json({
      //     status: "false",
      //     message: "Student_Id Not Found",
      //   });
      // }
 
      const existingschoolName = await schoolModel.findOne({
        name,
        isDeleted: false, 
      });
      if (existingschoolName) {
        return res.status(409).json({
          status: false,
          message: "School already exitst",
        });
      }

      let school = await schoolModel.create({
   name
      });

      if (school) {
        return res.status(200).json({
          status: true,
          Message: "Created Sucessfully!!",
          school,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "Something Went Wrong",
      });
      throw error;
    }
  }

  async schoolList(req, res) {
    try {
    
      let school= await schoolModel.find({isDeleted:false})
        if (school) {
          return res.status(200).json({
            success: true,
            totalschool: school.length,
            school,
          });
        }
      } catch (e) {
        res.status(500).json({
          success: false,
          message: "Something went wrong",
        });
        throw e;
      }
    // try {
    //   let school = await schoolModel.aggregate([
    //     {
    //       $match: {
    //         isDeleted: false,
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: "schools",
    //         localField: "studentId",
    //         foreignField: "_id",
    //         as: "studentDetails",
    //       },
    //     },
    //     {
    //       $lookup: {
    //         from: "courses",
    //         localField: "courseId",
    //         foreignField: "_id",
    //         as: "courseDetails",
    //       },
    //     },
    //     {
    //       $unwind: "$studentDetails",
    //     },
    //     {
    //       $unwind: "$courseDetails",
    //     },

    //     {
    //       $project: {
    //         studentId: "$studentDetails._id",
    //         studentName: "$studentDetails.name",
    //         courseTitle: "$courseDetails.title",
    //         courseFee: "$courseDetails.fee",
    //         schoolDate: {
    //           $dateToString: {
    //             format: "%Y-%m-%d",
    //             date: "$enrolledOn",
    //             timezone: "Asia/Kolkata",
    //           },
    //         },
    //       },
    //     },
    //     {
    //       $sort: { schoolDate: -1 },
    //     },
      
    //     {
    //       $group: {
    //         _id: "$studentId",
    //         studentName: { $first: "$studentName" },
    //         totalFeePaid: { $sum: "$courseFee" },
          
    //         schools: {
    //           $push: {
    //             courseTitle: "$courseTitle",
    //             courseFee: "$courseFee",
    //             schoolDate: "$schoolDate",
    //           },
    //         },
    //       },
    //     },
    //     {
    //       $match: {
    //         totalFeePaid: { $gt: 10000 },
    //       },
    //     },
    //   ]);

    //   if (school) {
    //     return res.status(200).json({
    //       status: true,
    //       message: "school List",
    //       totalschool: school.length,
    //       schoolDetails: school,
    //     });
    //   }
    // } catch (error) {
    //   res.status(400).json({
    //     message: "Something Went Wrong",
    //   });
    //   throw error;
    // }
  }
}

module.exports = new schoolController();
