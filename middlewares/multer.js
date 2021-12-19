const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function name(req, file, cb) {
    cb(null, "./public/img/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadSingle = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("image");

const uploadMultiple = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array("image");

function checkFileType(file, cb) {
  const fileType = /jpg|jpeg|png|gif/;
  const exName = fileType.test(path.extname(file.originalname).toLowerCase());
  const mimeType = fileType.test(file.mimetype);

  if (mimeType && exName) {
    return cb(null, true);
  } else {
    cb("Error: Image Only");
  }
}

module.exports = {
  uploadSingle,
  uploadMultiple,
};
