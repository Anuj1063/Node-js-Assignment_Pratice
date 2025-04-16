const saleModel = require("../models/sale.model");
const bookModel=require('../models/book.model')
class SaleController {
  async createSale(req, res) {
    try {
      const { bookId, quantity } = req.body;
      if (!bookId ||!quantity) {
        return res.status(400).json({
          status: false,
          Message: "All Feilds required!! "
        });
      }
      let isBookIdExist= await bookModel.findOne({_id:bookId})
      if(!isBookIdExist){
        return res.status(400).json({
          status: "false",
          message: "Book_Id Not Found",
        });
      }

      let sale = await saleModel.create({
        bookId,
        quantity,
      });

      if (sale) {
        return res.status(200).json({
          status: true,
          Message: "Created Sucessfully!!",
          sale,
        });
      }
    } catch (error) {
      res.status(400).json({
        message: "Something Went Wrong",
      });
      throw error;
    }
  }

  async saleList(req, res) {
    try {
      let sale=await saleModel.aggregate([
        {
          $lookup:{
          from:"books",
          localField:"bookId",
          foreignField:"_id",
          as:"bookDetails"

          }
        },
        {
          $unwind:"$bookDetails"
        },
        {
          $lookup:{
            from:"authors",
            localField:"bookDetails.authorId",
            foreignField:"_id",
            as:"authorDetails"
          }
        },{
          $unwind:"$authorDetails"
        },
        {
          $project:{
            "bookTitle":"$bookDetails.title",
            "authorName":"$authorDetails.name",
            "authorCountry": "$authorDetails.country",
            "quantitySold":"$quantity",
            "pricePerBook":"$bookDetails.price",
            "totalRevenue":{
              $multiply:["$quantity","$bookDetails.price"]
            },
            "soldDate":{

              $dateToString:{format:"%d-%m-%Y %H:%M",date:"$soldAt", timezone:"Asia/Kolkata" }
            }

          }
        },
        {
          $match:{
            "totalRevenue":{$gt:200},
            "authorCountry":"India"
            
          }
        }
      ])
      if (sale) {
        return res.status(200).json({
          status: true,
          message: "sale List",
          totalsale: sale.length,
          saleDetails: sale,
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

module.exports = new SaleController();
