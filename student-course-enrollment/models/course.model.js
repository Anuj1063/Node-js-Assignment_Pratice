const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    
    title: { type: String, required: true },
    fee:{type:Number,required:true},
    durationInWeeks:{type:Number,required:true},
  },
  { timestamps: true, versionKey: false }
);

const courseModel = mongoose.model("course", courseSchema);

module.exports = courseModel;
