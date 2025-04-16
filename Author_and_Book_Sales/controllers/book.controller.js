const bookModel = require("../models/book.model");
const authorModel=require('../models/author.model')

class BookController {
  async createbook(req, res) {
    try {
      const { authorId,title,price } = req.body;
      if (!title || !authorId|| !price) {
        res.status(400).json({
          message: "All Feild are required",
        });
      }
      let isAuthorIdExist= await authorModel.findOne({_id:authorId})
      if(!isAuthorIdExist){
        return res.status(400).json({
          status: "false",
          message: "Author_Id Not Found",
        });
      }
      let ifbookExist = await bookModel.findOne({ title });
      if (ifbookExist) {
        return res.status(400).json({
          status: "false",
          message: "Book Already Exist",
        });
      }

      const book = await bookModel.create({ title, authorId, price });
      if (book) {
        res.status(200).json({
          status: "success",
          message: "book Created SucessFully!!",
          book,
        });
      } else {
        res.status(400).json({
          message: "Failed To Create book",
        });
      }
    } catch (error) {
      throw error;
    }
  }
  async bookList(req, res) {
    try {
      const book = await bookModel.find({isDeleted:false});
      if (book) {
        return res.status(200).json({
          success: true,

          totalbook: book.length,
          book,
        });
      }
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new BookController();
