const studentModel = require("../models/student.model");

class studentController {
  async createStudent(req, res) {
    try {
      const { name,age,email} = req.body;

      if (!name || !age || !email) {
        return res.status(400).json({
          success: false,
          message: "All feild Required ",
        });
      }
      let isEmailExist=await studentModel.findOne({email})
    
      if(isEmailExist){
        return res.status(400).json({
          success: false,
          message: "Email already Exits ",
        });
      }
      const student = await studentModel.create({
        name,
        age,
        email,
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
    
    let student= await studentModel.find({isDeleted:false})
      if (student) {
        return res.status(200).json({
          success: true,
          totalStudent: student.length,
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
}

module.exports = new studentController();
