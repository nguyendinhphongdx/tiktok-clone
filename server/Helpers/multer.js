const multer = require("multer");
const path = require("path");
// Multer config
const multerConfigImage = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});
const multerConfigFile = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/images");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    // if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
    //   cb(new Error("File type is not supported"), false);
    //   return;
    // }
    cb(null, true);
  },
});
module.exports = {
  multerConfigImage: multerConfigImage,
  multerConfigFile: multerConfigFile,
};
