const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    message: { type: String },
    number: { type: String },
    trigger: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
