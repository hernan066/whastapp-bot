const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    state: { type: String },
    number: { type: String },
   
    products: { type: String, default: null },
    name: { type: String, default: null },
    address: { type: String, default: null },
    date: { type: Number }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);