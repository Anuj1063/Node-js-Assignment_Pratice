const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
      required: true,
    },
    quantity: { type: Number, required: true },
    orderedAt: { type: Date, default: Date.now },
    customerName: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const orderModel = mongoose.model("order", orderSchema);

module.exports = orderModel;
