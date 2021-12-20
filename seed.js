var seed = require("mongoose-seed");
var mongoose = require("mongoose");

var options = {
  autoIndex: true, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

// Connect to MongoDB via Mongoose
seed
  .connect("mongodb://127.0.0.1/staycation_db", options, function () {
    // Load Mongoose Model
    seed.loadModels([
      "./models/Activity",
      "./models/Bank",
      "./models/Booking",
      "./models/Category",
      "./models/Feature",
      "./models/Image",
      "./models/Item",
      "./models/Member",
      "./models/User",
    ]);

    seed.clearModels(
      [
        "Activities",
        "Banks",
        "Bookings",
        "Categories",
        "Features",
        "Images",
        "Items",
        "Members",
        "Users",
      ],
      function () {
        seed.populateModels(data, function () {
          seed.disconnect();
        });
      }
    );
  })
  .catch((err) => console.log(err));

const data = [
  // Start Images
  {
    model: "Images",
    document: [
      {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb1"),
        imageUrl: "img/upload/item-1.png",
      },
    ],
  },
  // END Images
];
