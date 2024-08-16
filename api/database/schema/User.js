const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: Number,
});

const User = mongoose.model(process.env.MONGOOSE_MODEL_USER, userSchema, process.env.MONGOOSE_COLLECTION_USER);

module.exports = { User, userSchema };
