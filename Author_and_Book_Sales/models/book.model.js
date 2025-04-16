const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "author",
      required: true,
    },
    title:{type:String,required:true},
    price:{type:Number,required:true},

 
    
    isDeleted:{type:Boolean,default:false}
  },
  { timestamps: true, versionKey: false }
);

const bookModel = mongoose.model("book", bookSchema);

module.exports = bookModel;
