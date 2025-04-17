const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema(
  {
   

    name:{type:String,required:true},
    isDeleted:{type:Boolean,default:false}
  },
  { timestamps: true, versionKey: false }
);

const schoolModel = mongoose.model("school", schoolSchema);

module.exports = schoolModel;
