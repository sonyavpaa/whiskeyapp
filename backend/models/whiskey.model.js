// const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const whiskiesSchema = new Schema(
  {
    whiskeyTitle: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamp: true,
  }
);

const Whiskies = mongoose.model("Whiskies", whiskiesSchema);

module.exports = Whiskies;
