const mongoose = require("mongoose");

const schema = mongoose.Schema;

//a user should have a name,email,password,avatar field -> all required
const userSchema = schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
