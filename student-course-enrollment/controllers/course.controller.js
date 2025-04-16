const courseModel = require("../models/course.model");

class CourseController {
  async createCourse(req, res) {
    try {
      const { title, fee, durationInWeeks } = req.body;
      if (!title || !fee || !durationInWeeks) {
        res.status(400).json({
          message: "All Feild are required",
        });
      }
      let ifCourseExist = await courseModel.findOne({ title });
      if (ifCourseExist) {
        return res.status(400).json({
          status: "sucess",
          message: "Course Already Exist",
        });
      }

      const course = await courseModel.create({ title, fee, durationInWeeks });
      if (course) {
        res.status(200).json({
          status: "sucess",
          message: "course Created SucessFully!!",
          course,
        });
      } else {
        res.status(400).json({
          message: "Failed To Create course",
        });
      }
    } catch (error) {
      throw error;
    }
  }
  async courseList(req, res) {
    try {
      const course = await courseModel.find({});
      if (course) {
        return res.status(200).json({
          success: true,

          totalCourse: course.length,
          course,
        });
      }
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new CourseController();
