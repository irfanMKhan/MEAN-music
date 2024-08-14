const mongoose = require("mongoose");

const albumSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  releasedYear: {
    type: Number,
    required: true,
  },
  songList: [
    {
      title: {
        type: String,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
      releaseYear: {
        type: Number,
        required: true,
      },
    },
  ],
});

const Album = mongoose.model("Album", albumSchema, "albums");

module.exports = { Album, albumSchema };
