const mongoose = require("mongoose");

const ResponseSchema = new mongoose.Schema({
  option_key: { type: String, default: null },
  /* replyMessage: { type: [String], default: null }, */
  replyMessage: { type: String, default: null },
  trigger: { type: String, default: null },
  media: { type: String, default: null },
  list: { type: String, default: null },
  actions: {
    title: { type: String },
    message: { type: String },
    title: { type: String },
    buttons: [{ 
      body: String, 
      body: String 
    }],
  },
});

module.exports = mongoose.model("Response", ResponseSchema);
