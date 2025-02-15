const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      default: 18,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    startupExperience: {
      type: String,
      required: true,
    },
    headaches: {
      type: [String],
      default: [],
    },
    startupDescription: {
      type: String,
      default: "",
    },
    startupPosition: {
      type: String,
      default: "",
    },
    roadMap: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
