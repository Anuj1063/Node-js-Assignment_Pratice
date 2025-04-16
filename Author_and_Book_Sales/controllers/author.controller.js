const authorModel = require("../models/author.model");

class AuthorController {
  async createauthor(req, res) {
    try {
      const { name,country} = req.body;

      if (!name || !country) {
        return res.status(400).json({
          success: false,
          message: "All feild Required ",
        });
      }
      let isAuthorExist=await authorModel.findOne({name})
    
      if(isAuthorExist){
        return res.status(400).json({
          success: false,
          message: "Author already Exits ",
        });
      }
      const author = await authorModel.create({
        name,
        country
      });

      if (author) {
        return res.status(200).json({
          success: true,
          message: "Author Created Sucessfully",
          author,
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

  async authorList(req, res) {
    try {
    
    let author= await authorModel.find({isDeleted:false})
      if (author) {
        return res.status(200).json({
          success: true,
          totalauthor: author.length,
          author,
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

module.exports = new AuthorController();
