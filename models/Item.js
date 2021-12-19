const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    default: "Indonesia",
  },
  city: {
    type: String,
    required: true,
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
  unit: {
    type: String,
    default: "night",
  },
  sumBooking: {
    type: Number,
    default: 0,
  },
  categoryId: {
    type: ObjectId,
    ref: "Categories",
  },
  imageId: [
    {
      type: ObjectId,
      ref: "Images",
    },
  ],
  featuredId: [
    {
      type: ObjectId,
      ref: "Features",
    },
  ],
  activityId: [
    {
      type: ObjectId,
      ref: "Activities",
    },
  ],
});

module.exports = mongoose.model("Items", itemSchema);
