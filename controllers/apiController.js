const Activity = require("../models/Activity");
const Booking = require("../models/Booking");
const Category = require("../models/Category");
const Item = require("../models/Item");
const Bank = require("../models/Bank");
const Member = require("../models/Member");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const activities = await Activity.find();
      const bookings = await Booking.find();
      const items = await Item.find();

      const mostPicked = await Item.find()
        .select("_id title country city price unit imageId")
        .limit(5)
        .populate("imageId", "_id imageUrl");
      const category = await Category.find()
        .select("_id name")
        .populate({
          path: "itemId",
          select: "_id title country city isPopular imageId",
          perDocumentLimit: 4,
          option: { sort: { sumBooking: -1 } },
          populate: {
            path: "imageId",
            select: "_id imageUrl",
            perDocumentLimit: 1,
          },
        });
      const testimonial = {
        _id: "asd1293uasdads1",
        imageUrl: "images/testimonial2.jpg",
        name: "Happy Family",
        rate: 4.55,
        content:
          "What a great trip with my family and I should try again next time soon ...",
        familyName: "Angga",
        familyOccupation: "Product Designer",
      };
      res.status(200).json({
        hero: {
          travelers: bookings.length,
          treasures: activities.length,
          cities: items.length,
        },
        mostPicked,
        category,
        testimonial,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  detailPage: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findOne({ _id: id })
        .populate("featuredId", "_id name qty imageUrl")
        .populate("activityId", "_id name type imageUrl")
        .populate("imageId", "_id imageUrl");
      const banks = await Bank.find();
      const testimonial = {
        _id: "asd1293uasdads1",
        imageUrl: "images/testimonial1.jpg",
        name: "Happy Family",
        rate: 4.55,
        content:
          "What a great trip with my family and I should try again next time soon ...",
        familyName: "Angga",
        familyOccupation: "Product Designer",
      };
      res.status(200).json({
        ...item._doc,
        banks,
        testimonial,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
  bookingPage: async (req, res) => {
    try {
      const {
        idItem,
        duration,
        bookingStartDate,
        bookingEndDate,
        firstName,
        lastName,
        email,
        phoneNumber,
        accountHolder,
        bankFrom,
      } = req.body;

      if (!req.file) {
        return res.status(404).json({ message: "Image Not Found" });
      }

      if (
        idItem === undefined ||
        duration === undefined ||
        bookingStartDate === undefined ||
        bookingEndDate === undefined ||
        firstName === undefined ||
        lastName === undefined ||
        email === undefined ||
        phoneNumber === undefined ||
        accountHolder === undefined ||
        bankFrom === undefined
      ) {
        return res.status(404).json({ message: "Please Fill Out All Field" });
      }
      const item = await Item.findOne({ _id: idItem });

      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }

      item.sumBooking += 1;

      await item.save();

      let total = item.price * duration;
      let tax = total * 0.1;

      const invoice = Math.floor(1000000 + Math.random() * 9000000);

      const member = await Member.create({
        firstName,
        lastName,
        email,
        phoneNumber,
      });

      const booking = await Booking.create({
        invoice,
        bookingStartDate,
        bookingEndDate,
        total: (total += tax),
        itemId: {
          _id: item._id,
          title: item.title,
          price: item.price,
          duration: duration,
        },
        memberId: member._id,
        payments: {
          proofPayment: `img/upload/${req.file.filename}`,
          bankFrom: bankFrom,
          accountHolder: accountHolder,
        },
      });

      res.status(201).json({ message: "Success booking", booking });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};
