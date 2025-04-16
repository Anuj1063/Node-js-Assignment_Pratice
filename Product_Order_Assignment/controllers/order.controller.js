const orderModel = require("../models/order.model");

class OrderController {
  async createOrder(req, res) {
    try {
      const { quantity, customerName, productId } = req.body;

      if (!productId || !customerName || !quantity) {
        return res.status(400).json({
          success: false,
          message: "All feild Required ",
        });
      }
      const order = await orderModel.create({
        customerName,
        productId,
        quantity,
      });

      if (order) {
        return res.status(200).json({
          success: true,
          message: "Order Created Sucessfully",
          order,
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

  async orderList(req, res) {
    try {
      const order = await orderModel.aggregate([
       
        {
           $lookup:{
            from:'products',
            localField:'productId',
            foreignField:"_id",
            as:"productDetails"
           } 
        },{
            $unwind:"$productDetails"
        },
       {
            $project:{
              
                customerName:1,
                "productName":"$productDetails.name",
                "productPrice":"$productDetails.price",
                quantity:1,
                totalOrderPrice: { 
                    $multiply: ["$productDetails.price", "$quantity"] 
                  },
                "orderDate":{$dateToString:{ format: "%Y-%m-%d %H:%M:%S", date: "$orderedAt", timezone: "Asia/Kolkata" }}
                
            }
        },
        {
          $sort:{
              orderDate:-1
          }
      }, 
        {
            $match:{
                totalOrderPrice:{$gt: 10000}
            }
        }
    ]);
      if (order) {
        return res.status(200).json({
          success: true,
          orderCount: order.length,
          order,
        });
      }
    } catch (e) {
      throw e;
    }
  }
}

module.exports = new OrderController();
