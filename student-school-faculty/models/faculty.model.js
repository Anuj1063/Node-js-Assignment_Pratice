const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
  {
    
    name: { type: String, required: true },
    phone:{type:Number,required:true},
    schoolId:{type:mongoose.Schema.Types.ObjectId,ref:"school" ,required: true,},
    isDeleted:{type:Boolean,default:false}
  },
  { timestamps: true, versionKey: false }
);

const facultyModel = mongoose.model("faculty", facultySchema);

module.exports = facultyModel;
