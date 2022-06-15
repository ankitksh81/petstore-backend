const multer = require("multer");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, "pets-" + Date.now() + ".xlsx");
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
