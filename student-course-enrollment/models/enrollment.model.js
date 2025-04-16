const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "student",
      required: true,
    },
    courseId: { type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        required: true, },
    enrolledOn: { type: Date, default: Date.now },
    isDeleted:{type:Boolean,default:false}
  },
  { timestamps: true, versionKey: false }
);

const enrollmentModel = mongoose.model("enrollment", enrollmentSchema);

module.exports = enrollmentModel;
