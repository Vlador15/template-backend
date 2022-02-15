const { Schema, model, ObjectId } = require("mongoose");

const Users = new Schema({
  password: { type: String },
  email: { type: String, unique: true },
  adminLevel: { type: Number },
});

module.exports = model("Users", Users);
