
const schoolModel = require("../models/school.model");


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

  }
}

module.exports = new schoolController();
