const Category = require("../models/Category");
const Bank = require("../models/Bank");
const fs = require("fs");
const path = require("path");
const Item = require("../models/Item");
const Image = require("../models/Image");
const Feature = require("../models/Feature");
const Activity = require("../models/Activity");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  viewSignin: async (req, res) => {
    try {
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      if (req.session.user == null || req.session.user == undefined) {
        res.render("index", {
          alert: { message: alertMessage, status: alertStatus },
          title: "Admin - Login",
        });
      } else {
        res.redirect("/admin/dashboard");
      }
    } catch (error) {
      res.redirect("/admin/signin");
    }
  },
  actionSignin: async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username: username });

      if (!user) {
        req.flash("alertMessage", "Username / Password is Wrong");
        req.flash("alertStatus", "danger");
        res.redirect("/admin/signin");
      } else {
        await bcrypt
          .compare(password, user.password)
          .then((res) => {
            req.session.user = {
              id: user._id,
              username: user.username,
            };
            res.redirect("/admin/dashboard");
          })
          .catch((err) => {
            req.flash("alertMessage", "Username / Password is Wrong");
            req.flash("alsertStatus", "danger");
            res.redirect("/admin/signin");
          });
      }
    } catch (error) {
      res.redirect("/admin/signin");
    }
  },
  actionLogout: async (req, res) => {
    req.session.destroy();
    res.redirect("/admin/signin");
  },
  viewDashboard: async (req, res) => {
    res.render("admin/dashboard/index", { title: "Admin - Dashboard" });
  },

  // START Category Endpoint
  viewCategory: async (req, res) => {
    try {
      const categories = await Category.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      res.render("admin/category/index", {
        categories,
        alert: { message: alertMessage, status: alertStatus },
        title: "Admin - Category",
      });
    } catch (error) {
      res.redirect("/admin/category");
    }
  },

  addCategory: async (req, res) => {
    try {
      const { name } = req.body;

      await Category.create({ name });

      req.flash("alertMessage", "Success Add Category");
      req.flash("alertStatus", "success");
      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },

  updateCategory: async (req, res) => {
    try {
      const { name, id } = req.body;
      const category = await Category.findById(id).exec();
      await category.updateOne({ name: name });
      req.flash("alertMessage", "Success Update Category");
      req.flash("alertStatus", "success");
      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findById(id).exec();
      await category.remove();

      req.flash("alertMessage", "Success Delete Category");
      req.flash("alertStatus", "success");
      res.redirect("/admin/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/category");
    }
  },
  // END Category Endpoint

  // START Bank Endpoint
  viewBank: async (req, res) => {
    try {
      const banks = await Bank.find();

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      res.render("admin/bank/index", {
        banks,
        alert: { message: alertMessage, status: alertStatus },
        title: "Admin - Bank",
      });
    } catch (error) {
      res.redirect("/admin/bank");
    }
  },

  addBank: async (req, res) => {
    try {
      const { nameBank, nomorRekening, name } = req.body;
      await Bank.create({
        nameBank,
        nomorRekening,
        name,
        imageUrl: `img/upload/${req.file.filename}`,
      });

      req.flash("alertMessage", "Success Add Bank");
      req.flash("alertStatus", "success");
      res.redirect("/admin/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/bank");
    }
  },

  updateBank: async (req, res) => {
    try {
      const { id, nameBank, nomorRekening, name } = req.body;
      const bank = await Bank.findById(id).exec();

      await bank.update({
        nameBank,
        nomorRekening,
        name,
      });

      if (req.file !== undefined) {
        await fs.unlink(path.join(`public/${bank.imageUrl}`), (err) => {
          console.log(err);
        });
        await bank.update({
          imageUrl: `img/upload/${req.file.filename}`,
        });
      }

      req.flash("alertMessage", "Success Update Bank");
      req.flash("alertStatus", "success");
      res.redirect("/admin/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/bank");
    }
  },

  deleteBank: async (req, res) => {
    try {
      const { id } = req.params;
      const bank = await Bank.findById(id).exec();

      await bank.remove();

      req.flash("alertMessage", "Success Delete Bank");
      req.flash("alertStatus", "success");
      res.redirect("/admin/bank");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/bank");
    }
  },
  // END Bank Endpoint

  // START Item Endpoint
  viewItem: async (req, res) => {
    try {
      const items = await Item.find();
      const categories = await Category.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      res.render("admin/item/index", {
        items,
        categories,
        action: "view",
        alert: { message: alertMessage, status: alertStatus },
        title: "Admin - Item",
      });
    } catch (error) {
      res.redirect("/admin/item");
    }
  },
  addItem: async (req, res) => {
    try {
      const { title, price, city, categoryId, about } = req.body;
      if (req.files.length > 0) {
        // Create Item
        const item = await Item.create({
          categoryId,
          title,
          price,
          city,
          description: about,
        });
        // Get Category
        const category = await Category.findById(categoryId).exec();
        // Update category
        category.itemId.push({ _id: item._id });
        await category.save();

        // Create Image and update Item image
        for (let index = 0; index < req.files.length; index++) {
          const imageUrl = await Image.create({
            imageUrl: `img/upload/${req.files[index].filename}`,
          });
          item.imageId.push({ _id: imageUrl._id });
          await item.save();
        }

        req.flash("alertMessage", "Success Add Item");
        req.flash("alertStatus", "success");
        res.redirect("/admin/item");
      }
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/item");
    }
  },
  viewItemEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findOne({ _id: id }).populate({
        path: "categoryId",
        select: "id name",
      });
      const categories = await Category.find();
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      res.render("admin/item/index", {
        item,
        categories,
        action: "edit",
        alert: {
          message: alertMessage,
          status: alertStatus,
        },
        title: "Admin - Item",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/item");
    }
  },
  updateItem: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, price, city, categoryId, about } = req.body;

      const item = await Item.findById(id).exec();

      await item.updateOne({
        title,
        price,
        city,
        description: about,
      });

      if (req.files.length > 0) {
        const imageUpdate = await Image.findOne({ _id: item.imageId[0]._id });
        await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`), (err) => {
          console.log(err);
        });
        imageUpdate.imageUrl = `img/upload/${req.files[0].filename}`;
        await imageUpdate.save();
      }

      req.flash("alertMessage", "Success Update Item");
      req.flash("alertStatus", "success");
      res.redirect("/admin/item");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/item");
    }
  },
  deleteItem: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findOne({ _id: id }).populate("imageId");
      item.imageId.forEach((imageData, index) => {
        Image.findOne({ _id: imageData._id })
          .then((image) => {
            fs.unlink(path.join(`public/${image.imageUrl}`), (err) => {
              console.log(err);
            });
            image.remove();
          })
          .catch((err) => {
            req.flash("alertMessage", `${error.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/admin/item");
          });
      });

      await item.remove();
      req.flash("alertMessage", "Success Delete Item");
      req.flash("alertStatus", "success");
      res.redirect("/admin/item");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/item");
    }
  },
  viewItemImageDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const item = await Item.findOne({ _id: id }).populate(
        "imageId",
        "_id imageUrl"
      );

      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");
      res.render("admin/item/index", {
        alert: {
          message: alertMessage,
          status: alertStatus,
        },
        item,
        title: "Admin - Item",
        action: "show image",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/item");
    }
  },
  viewItemDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const features = await Feature.find({ itemId: id });
      const activities = await Activity.find({ itemId: id });
      const alertMessage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      res.render("admin/item/detail_item/index", {
        alert: {
          message: alertMessage,
          status: alertStatus,
        },
        itemId: id,
        features,
        activities,
        title: "Admin - Item",
      });
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/admin/item");
    }
  },
  // END Item Endpoint

  // START Feature Endpoint
  addFeature: async (req, res) => {
    const { itemId } = req.body;
    try {
      const { name, qty } = req.body;

      await Feature.create({
        name,
        qty,
        imageUrl: `img/upload/${req.file.filename}`,
        itemId,
      });

      req.flash("alertMessage", "Success Add Feature");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/item/show-detail/${itemId}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/item/show-detail/${itemId}`);
    }
  },
  updateFeature: async (req, res) => {
    const { itemId } = req.body;
    try {
      const { id, name, qty } = req.body;

      const feature = await Feature.findById(id).exec();

      await feature.updateOne({
        name,
        qty,
      });

      if (req.file !== undefined) {
        await fs.unlink(path.join(`public/${feature.imageUrl}`), (err) => {
          console.log(err);
        });
        await feature.updateOne({
          imageUrl: `img/upload/${req.file.filename}`,
        });
      }

      req.flash("alertMessage", "Success Update Feature");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/item/show-detail/${itemId}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/item/show-detail/${itemId}`);
    }
  },
  deleteFeature: async (req, res) => {
    const { itemId } = req.params;
    try {
      const { id } = req.params;
      const feature = await Feature.findById(id).exec();
      await fs.unlink(path.join(`public/${feature.imageUrl}`), (err) => {
        console.log(err);
      });
      await feature.remove();

      req.flash("alertMessage", "Success Delete Feature");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/item/show-detail/${itemId}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/item/show-detail/${itemId}`);
    }
  },
  // END Feature Endpoint

  // START Activity Endpoint
  addActivity: async (req, res) => {
    const { itemId } = req.body;
    try {
      const { name, type } = req.body;

      await Activity.create({
        name,
        type,
        imageUrl: `img/upload/${req.file.filename}`,
        itemId,
      });

      req.flash("alertMessage", "Success Add Activity");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/item/show-detail/${itemId}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/item/show-detail/${itemId}`);
    }
  },
  updateActivity: async (req, res) => {
    const { itemId } = req.body;

    try {
      const { id, name, type } = req.body;

      const activity = await Activity.findById(id).exec();

      await activity.updateOne({
        name,
        type,
      });
      if (req.file !== undefined) {
        await fs.unlink(path.join(`public/${activity.imageUrl}`), (err) => {
          console.log(err);
        });

        await activity.updateOne({
          imageUrl: `img/upload/${req.file.filename}`,
        });
      }

      req.flash("alertMessage", "Success Update Activity");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/item/show-detail/${itemId}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/item/show-detail/${itemId}`);
    }
  },
  deleteActivity: async (req, res) => {
    const { itemId } = req.params;
    try {
      const { id } = req.params;
      const activity = await Activity.findById(id).exec();

      await fs.unlink(path.join(`public/${activity.imageUrl}`), (err) => {
        console.log(err);
      });

      await activity.remove();

      req.flash("alertMessage", "Success Delete Activity");
      req.flash("alertStatus", "success");
      res.redirect(`/admin/item/show-detail/${itemId}`);
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      res.redirect(`/admin/item/show-detail/${itemId}`);
    }
  },
  // END Activity Endpoint
  viewBooking: async (req, res) => {
    res.render("admin/booking/index", { title: "Admin - Booking" });
  },
};
