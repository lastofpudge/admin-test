const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  encryptedPassword: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "member"],
    required: true,
  },
});

const Users = mongoose.model("Users", UsersSchema);

module.exports = { UsersSchema, Users };
