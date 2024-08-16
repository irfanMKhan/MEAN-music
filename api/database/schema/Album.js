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

const Album = mongoose.model(process.env.MONGOOSE_MODEL_ALBUM, albumSchema, process.env.MONGOOSE_COLLECTION_ALBUM);

module.exports = { Album, albumSchema };
