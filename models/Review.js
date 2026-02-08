const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    game: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Game",
    },
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Review", reviewSchema);
