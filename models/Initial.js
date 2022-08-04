const mongoose = require("mongoose");

const InitialSchema = new mongoose.Schema({
 

  keywords: { type: String },
  option_key: { type: String },
});

module.exports = mongoose.model("Initial", InitialSchema);
