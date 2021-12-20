const express = require("express");
const router = express.Router();
const { uploadSingle, uploadMultiple } = require("../middlewares/multer");
const adminController = require("../controllers/adminController");
const auth = require("../middlewares/auth");

router.get("/signin", adminController.viewSignin);
router.post("/signin", adminController.actionSignin);
// router.use(auth);
router.get("/logout", adminController.actionLogout);
router.get("/dashboard", adminController.viewDashboard);

// START Category Router
router.get("/category", adminController.viewCategory);
router.post("/category", adminController.addCategory);
router.put("/category", adminController.updateCategory);
router.delete("/category/:id", adminController.deleteCategory);
// END Category Router

// START Bank Router
router.get("/bank", adminController.viewBank);
router.post("/bank", uploadSingle, adminController.addBank);
router.put("/bank", uploadSingle, adminController.updateBank);
router.delete("/bank/:id", adminController.deleteBank);
// END Bank Router

// START Item Router
router.get("/item", adminController.viewItem);
router.post("/item", uploadMultiple, adminController.addItem);
router.get("/item/:id", adminController.viewItemEdit);
router.put("/item/:id", uploadMultiple, adminController.updateItem);
router.delete("/item/:id", adminController.deleteItem);
router.get("/item/show-image/:id", adminController.viewItemImageDetail);
router.get("/item/show-detail/:id", adminController.viewItemDetail);
// END Item Router

// START Feature Router
router.post("/item/add/feature", uploadSingle, adminController.addFeature);
router.put("/item/update/feature", uploadSingle, adminController.updateFeature);
router.delete("/item/:itemId/feature/:id", adminController.deleteFeature);
// END Feature Router

// START Activity Router
router.post("/item/add/activity", uploadSingle, adminController.addActivity);
router.put(
  "/item/update/activity",
  uploadSingle,
  adminController.updateActivity
);
router.delete("/item/:itemId/activity/:id", adminController.deleteActivity);
// END Activity Router

// START Booking Router
router.get("/booking", adminController.viewBooking);
router.get("/booking/:id", adminController.showDetailBooking);
router.put("/booking/:id/confirmation", adminController.actionConfirmation);
router.put("/booking/:id/reject", adminController.actionReject);
// END Booking Router
module.exports = router;
