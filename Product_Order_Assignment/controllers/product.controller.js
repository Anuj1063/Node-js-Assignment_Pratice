const productModel = require("../models/product.model");

class ProductController {
  async CreateProduct(req, res) {
    try {
      const { name, price, category } = req.body;
        if(!name||!price||!category){
            res.status(400).json({
                message:"All Feild are required"
            })
        }
        let isNameExist=await productModel.findOne({name})
        if(isNameExist){
            return res.status(400).json({
                message:"Name already Exist"
            })
        }

      const product=await productModel.create({name,price,category})
      if(product){
        res.status(200).json({
            status:"sucess",
            message:"Product Created SucessFully!!",
            product,
        })
      }else{
        res.status(400).json({
            message:"Failed To Create Product"
        })
      }


    } catch (error) {
      throw error;
    }
  }
  async productList(req,res){
    try {
        
        const product=await productModel.find({})
        if(product){
            return res.status(200).json({
                success:true,

                productCount:product.length,
                product
            })
           }
        
    } catch (e) {
        throw e
        
    }
}
}

module.exports = new ProductController();
