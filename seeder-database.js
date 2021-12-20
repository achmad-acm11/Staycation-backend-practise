const mongoose = require("mongoose");
const Activity = require("./models/Activity");
const Bank = require("./models/Bank");
const Booking = require("./models/Booking");
const Category = require("./models/Category");
const Feature = require("./models/Feature");
const Image = require("./models/Image");
const Item = require("./models/Item");
const Member = require("./models/Member");
const User = require("./models/User");

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

async function connect() {
  await mongoose
    .connect("mongodb://localhost:27017/staycation_db", options)
    .then((res) => {
      console.log("Connect to MongoDB");
    })
    .catch((err) => console.log(err));
}

const data = {
  // START Categories
  Categories: [
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901111"),
      name: "Houses with beauty backyard",
      itemId: [
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902222") },
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902223") },
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902224") },
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902225") },
      ],
    },
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901112"),
      name: "Hotels with large living room",
      itemId: [
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902226") },
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902227") },
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902228") },
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902229") },
      ],
    },
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc901113"),
      name: "Apartment with kitchen",
      itemId: [
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902230") },
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902231") },
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902232") },
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902233") },
      ],
    },
  ],
  // END Categories

  // START Item
  Item: [
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
      title: "Tabby Town",
      price: 12,
      sumBooking: 2,
      country: "Indonesia",
      city: "Lampung",
      isPopular: false,
      description:
        "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
      unit: "night",
      imageId: [
        // done
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb4") },
        // done
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb5") },
        // done
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb6") },
      ],
      featureId: [
        // done
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa09") },
        // done
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa10") },
        // done
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa11") },
        // done
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa12") },
        // done
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa13") },
        // done
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa14") },
        // done
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa15") },
        // done
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa16") },
      ],
      activityId: [
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb05") },
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb06") },
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb07") },
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb08") },
      ],
    },
    {
      // done
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
      title: "Seattle Rain",
      price: 20,
      sumBooking: 4,
      country: "Indonesia",
      city: "Bandung",
      isPopular: false,
      description:
        "Minimal techno is a minimalist subgenre of techno music. It is characterized by a stripped-down aesthetic that exploits the use of repetition and understated development. Minimal techno is thought to have been originally developed in the early 1990s by Detroit-based producers Robert Hood and Daniel Bell.",
      unit: "night",
      imageId: [
        // done
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb1") },
        // done
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb2") },
        // done
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb3") },
      ],
      featureId: [
        // done
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa01") },
        // done
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa02") },
        // done
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa03") },
        // done
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa04") },
        // done
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa05") },
        // done
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa06") },
        // done
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa07") },
        // done
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa08") },
      ],
      activityId: [
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb01") },
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb02") },
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb03") },
        { _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb04") },
      ],
    },
  ],
  // END Item

  // START Image
  Image: [
    {
      // done
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb1"),
      imageUrl: "img/upload/item-1.png",
    },
    // done
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb2"),
      imageUrl: "img/upload/item-2.png",
    },
    // done
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb3"),
      imageUrl: "img/upload/item-3.png",
    },
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb4"),
      imageUrl: "img/upload/item-4.png",
    },
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb5"),
      imageUrl: "img/upload/item-1.png",
    },
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb6"),
      imageUrl: "img/upload/item-2.png",
    },
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb7"),
      imageUrl: "img/upload/item-3.png",
    },
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cdb9"),
      imageUrl: "img/upload/item-4.png",
    },
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd10"),
      imageUrl: "img/upload/item-1.png",
    },
    {
      // done
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd11"),
      imageUrl: "img/upload/item-1.png",
    },
    // done
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd12"),
      imageUrl: "img/upload/item-2.png",
    },
    // done
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd13"),
      imageUrl: "img/upload/item-3.png",
    },
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd14"),
      imageUrl: "img/upload/item-4.png",
    },
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd15"),
      imageUrl: "img/upload/item-1.png",
    },
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cd16"),
      imageUrl: "img/upload/item-2.png",
    },
  ],
  // END Image

  // START feature
  Feature: [
    {
      // done
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa01"),
      name: "badroom",
      qty: 2,
      imageUrl: "img/upload/feature-1.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
    },
    {
      // done
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa02"),
      name: "living room",
      qty: 23,
      imageUrl: "img/upload/feature-2.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
    },
    {
      // done
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa03"),
      name: "televison",
      qty: 12,
      imageUrl: "img/upload/feature-3.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
    },
    {
      // done
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa04"),
      name: "televison",
      qty: 5,
      imageUrl: "img/upload/feature-4.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
    },
    {
      // done
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa05"),
      name: "mbp/s",
      qty: 5,
      imageUrl: "img/upload/feature-5.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
    },
    {
      // done
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa06"),
      name: "unit ready",
      qty: 5,
      imageUrl: "img/upload/feature-6.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
    },
    {
      // done
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa07"),
      name: "refigrator",
      qty: 5,
      imageUrl: "img/upload/feature-7.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
    },
    {
      // done
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa08"),
      name: "televion",
      qty: 5,
      imageUrl: "img/upload/feature-8.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
    },
    // item 2
    {
      // done
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa09"),
      name: "badroom",
      qty: 2,
      imageUrl: "img/upload/feature-1.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
    },
    {
      // done
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa10"),
      name: "living room",
      qty: 23,
      imageUrl: "img/upload/feature-2.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
    },
    {
      // done
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa11"),
      name: "televison",
      qty: 12,
      imageUrl: "img/upload/feature-3.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
    },
    {
      // done
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa12"),
      name: "televison",
      qty: 5,
      imageUrl: "img/upload/feature-4.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
    },
    {
      // done
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa13"),
      name: "mbp/s",
      qty: 5,
      imageUrl: "img/upload/feature-5.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
    },
    {
      // done
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa14"),
      name: "unit ready",
      qty: 5,
      imageUrl: "img/upload/feature-6.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
    },
    {
      // done
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa15"),
      name: "refigrator",
      qty: 5,
      imageUrl: "img/upload/feature-7.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
    },
    {
      // done
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90aa16"),
      name: "televion",
      qty: 5,
      imageUrl: "img/upload/feature-8.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
    },
  ],
  // END feature

  // START Activity
  Activity: [
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb01"),
      name: "Green Lake",
      type: "Nature",
      imageUrl: "img/upload/activity-1.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
    },
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb02"),
      name: "Dog Clubs",
      type: "Pool",
      imageUrl: "img/upload/activity-2.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
    },
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb03"),
      name: "Labour and Wait",
      type: "Shopping",
      imageUrl: "img/upload/activity-3.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
    },
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb04"),
      name: "Labour and Wait",
      type: "Shopping",
      imageUrl: "img/upload/activity-4.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
    },
    // done 2
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb05"),
      name: "Green Lake",
      type: "Nature",
      imageUrl: "img/upload/activity-3.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
    },
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb06"),
      name: "Dog Clubs",
      type: "Pool",
      imageUrl: "img/upload/activity-2.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
    },
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb07"),
      name: "Labour and Wait",
      type: "Shopping",
      imageUrl: "img/upload/activity-1.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
    },
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90bb08"),
      name: "Labour and Wait",
      type: "Shopping",
      imageUrl: "img/upload/activity-4.png",
      itemId: mongoose.Types.ObjectId("5e96cbe292b97300fc902223"),
    },
  ],
  // END Activity

  // START Booking
  Booking: [
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc90cee1"),
      bookingStartDate: "12-12-2020",
      bookingEndDate: "12-12-2020",
      invoice: 1231231,
      itemId: {
        _id: mongoose.Types.ObjectId("5e96cbe292b97300fc902222"),
        title: "Village Angga",
        price: 6,
        duration: 2,
      },
      total: 12,
      memberId: mongoose.Types.ObjectId("5e96cbe292b97300fc903333"),
      bankId: mongoose.Types.ObjectId("5e96cbe292b97300fc903323"),
      payments: {
        proofPayment: "img/upload/buktibayar.jpeg",
        bankFrom: "BCA",
        status: "Proses",
        accountHolder: "ang",
      },
    },
  ],
  // END Booking

  // START Member
  Member: [
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc903333"),
      firstName: "Elfin",
      lastName: "Sanjaya",
      email: "elfinsanjaya12@gmail.com",
      phoneNumber: "082377954008",
    },
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc903334"),
      firstName: "Yein",
      lastName: "Narayana",
      email: "elfinsanjaya1207@gmail.com",
      phoneNumber: "082377954008",
    },
  ],
  // END Member

  // START Bank
  Bank: [
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc903322"),
      nameBank: "Mandiri",
      nomorRekening: "089898",
      name: "elfin",
      imageUrl: "img/upload/logo mandiri.png",
    },
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc903323"),
      nameBank: "BCA",
      nomorRekening: "878678",
      name: "elfin",
      imageUrl: "img/upload/logo bca.png",
    },
  ],
  // END Bank

  // START User
  User: [
    {
      _id: mongoose.Types.ObjectId("5e96cbe292b97300fc903345"),
      username: "admin",
      password: "rahasia",
    },
  ],
  // END User
};

async function dropDatabase() {
  console.log("Removing Collection");
  await Activity.deleteMany();
  await Bank.deleteMany();
  await Booking.deleteMany();
  await Booking.deleteMany();
  await Category.deleteMany();
  await Feature.deleteMany();
  await Image.deleteMany();
  await Item.deleteMany();
  await Member.deleteMany();
  await User.deleteMany();
  console.log("Success!");
}

async function insertData() {
  try {
    console.log("Insert All Category");
    await Category.create(data.Categories);
    console.log("Insert All Item");
    await Item.create(data.Item);
    console.log("Insert All Image");
    await Image.create(data.Image);
    console.log("Insert All Feature");
    await Feature.create(data.Feature);
    console.log("Insert All Activity");
    await Activity.create(data.Activity);
    console.log("Insert All Booking");
    await Booking.create(data.Booking);
    console.log("Insert All Member");
    await Member.create(data.Member);
    console.log("Insert All Bank");
    await Bank.create(data.Bank);
    console.log("Insert All User");
    await User.create(data.User);
  } catch (error) {
    console.log("Error : " + error);
  }
  console.log("Insert Complete");
}
async function run() {
  await connect();
  await dropDatabase();
  await insertData();
  mongoose.disconnect();
  console.log("MongoDB Disconect");
}

run();
