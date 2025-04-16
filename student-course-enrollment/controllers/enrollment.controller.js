
const enrollmentModel = require("../models/enrollment.model");
const studentModel=require('../models/student.model')
const courseModel=require('../models/course.model')

class EnrollmentController {
  async createEnrollment(req, res) {
    try {
      const { studentId, courseId } = req.body;
      if (!studentId || !courseId) {
        return res.status(400).json({
          status: false,
          Message: "All Id's required!! ",
        });
      }
      let isStudentIdExist= await studentModel.findOne({_id:studentId})
      if(!isStudentIdExist){
        return res.status(400).json({
          status: "false",
          message: "Student_Id Not Found",
        });
      }
      let iscourseIdExist= await courseModel.findOne({_id:courseId})
      if(!iscourseIdExist){
        return res.status(400).json({
          status: "false",
          message: "course_Id Not Found",
        });
      }
      const existingEnrollment = await enrollmentModel.findOne({
        studentId,
        courseId,
        isDeleted: false, 
      });
      if (existingEnrollment) {
        return res.status(409).json({
          status: false,
          message: "Student already enrolled in this course!",
        });
      }

      let enrollment = await enrollmentModel.create({
        studentId,
        courseId,
      });

      if (enrollment) {
        return res.status(200).json({
          status: true,
          Message: "Created Sucessfully!!",
          enrollment,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "Something Went Wrong",
      });
      throw error;
    }
  }

  async enrollmentList(req, res) {
    try {
      let enrollment = await enrollmentModel.aggregate([
        {
          $match: {
            isDeleted: false,
          },
        },
        {
          $lookup: {
            from: "students",
            localField: "studentId",
            foreignField: "_id",
            as: "studentDetails",
          },
        },
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "courseDetails",
          },
        },
        {
          $unwind: "$studentDetails",
        },
        {
          $unwind: "$courseDetails",
        },

        {
          $project: {
            studentId: "$studentDetails._id",
            studentName: "$studentDetails.name",
            courseTitle: "$courseDetails.title",
            courseFee: "$courseDetails.fee",
            enrollmentDate: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$enrolledOn",
                timezone: "Asia/Kolkata",
              },
            },
          },
        },
        {
          $sort: { enrollmentDate: -1 },
        },
      
        {
          $group: {
            _id: "$studentId",
            studentName: { $first: "$studentName" },
            totalFeePaid: { $sum: "$courseFee" },
          
            enrollments: {
              $push: {
                courseTitle: "$courseTitle",
                courseFee: "$courseFee",
                enrollmentDate: "$enrollmentDate",
              },
            },
          },
        },
        {
          $match: {
            totalFeePaid: { $gt: 10000 },
          },
        },
      ]);

      if (enrollment) {
        return res.status(200).json({
          status: true,
          message: "Enrollment List",
          totalEnrollment: enrollment.length,
          enrollmentDetails: enrollment,
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

module.exports = new EnrollmentController();
