const mongoose = require("mongoose");

const ItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
});

const Items = mongoose.model("Items", ItemsSchema);

module.exports = { ItemsSchema, Items };
