const mongoose = require("mongoose");

const { albumSchema } = require("./AlbumSchema");

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

const Artist = mongoose.model("Artist", artistSchema, "artists");

module.exports = { Artist, artistSchema };
