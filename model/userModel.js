const mongoose = require("mongoose");

// const validateEmail = function (email) {
//   var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//   return re.test(email);
// };

const userModel = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      // required: "Email address is required",
      // validate: [validateEmail, "Please fill a valid email address"],
      // match: [
      //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      //   "Please fill a valid email address",
      // ],
    },
    password: {
      type: String,
      required: true,
      min: 8,
      max: 12,
    },

    verifiedtoken: {
      type: String,
    },
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "contactsCLTs",
      },
    ],
    command: {
      type: String,
    },
    isverify: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userModel);
