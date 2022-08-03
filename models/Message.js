const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    number: { type: String, required: true },
    trigger: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
