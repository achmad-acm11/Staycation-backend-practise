const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const featureSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  qty: {
    type: Number,
    require: true,
  },
  imageUrl: {
    type: String,
    require: true,
  },
  itemId: {
    type: ObjectId,
    ref: "Items",
  },
});

module.exports = mongoose.model("Features", featureSchema);
