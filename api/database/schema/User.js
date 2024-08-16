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
  passwordHash: {
    type: String,
    required: true,
  },
  age: Number,
  createdOn: Date,
});

const User = mongoose.model(process.env.MONGOOSE_MODEL_USER, userSchema, process.env.MONGOOSE_COLLECTION_USER);

module.exports = { User, userSchema };
