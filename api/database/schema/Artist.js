const mongoose = require("mongoose");

const { albumSchema } = require("./Album");

const artistSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  type: {
    type: String,
    required: true,
  },
  genre: String,
  albumList: [albumSchema],
});

const Artist = mongoose.model(process.env.MONGOOSE_MODEL_ARTIST, artistSchema, process.env.MONGOOSE_COLLECTION_ARTIST);

module.exports = { Artist, artistSchema };
