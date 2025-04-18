const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name:{type:String,required:true},
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"category",
      default:null,
    },
  isDeleted:{type:Boolean,default:false},
  isActive:{type:String,default:true}
  },
  { timestamps: true, versionKey: false }
);

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;
