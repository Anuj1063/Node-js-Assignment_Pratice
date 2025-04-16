const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema(
  {
    bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "book",
          required: true,
        },
    quantity:{type:Number,required:true},
    soldAt:{type:Date,default:Date.now}
    
  },
  { timestamps: true, versionKey: false }
);

const saleModel = mongoose.model("sale", saleSchema);

module.exports = saleModel;
