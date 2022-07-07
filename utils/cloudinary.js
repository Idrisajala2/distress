const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dtlcemzzb",
  api_key: 266788636627887,
  api_secret: "8qPMD6Du9QWZ8I-WejXBeKD0dm4",
  secure: true,
});

module.exports = cloudinary;
