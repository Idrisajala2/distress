const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const cloudinary = require("../utils/cloudinary");
const jwt = require("jsonwebtoken");
const verifiedEmail = require("../utils/sendMail");
const getAllUser = async (req, res) => {
  try {
    const user = await userModel.find();

    res.status(200).json({ message: "success", data: user });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userModel.find();
    res.status(200).json({ message: "success", data: user });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);
    const user = await userModel.create({
      userName,
      email,
      password: hashed,
    });
    verifiedEmail(email, user._id)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));

    res
      .status(201)
      .json({ message: "created please kindly check your mail", data: user });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const verifyUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (user) {
      if (user.verifiedtoken !== "") {
        await userModel.findByIdAndUpdate(
          req.params.id,
          {
            isverify: true,
            verifiedtoken: "",
          },
          { new: true }
        );
        res.status(201).json({
          status: "Verification complete proceed to sign in",
        });
      } else {
        res.status(404).json({
          status: "Verification failed",
        });
      }
    } else {
      res.status(404).json({
        status: "user not found",
      });
    }
  } catch (error) {
    res.status(404).json({
      status: "alluser failed",
      message: error.message,
    });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    res.status(200).json({ message: "found", data: user });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const updateSingleUser = async (req, res) => {
  try {
    const { command } = req.body;
    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      { command },
      { new: true }
    );
    res.status(200).json({ message: "user updated", data: user });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const deleteSingleUser = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "deleted" });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
      const checkPassword = await bcrypt.compare(password, user.password);

      if (checkPassword) {
        const token = jwt.sign({ _id: user._id }, "ThisisTheKEy", {
          expiresIn: "2d",
        });

        const { password, ...info } = user._doc;
        const data1 = user._doc;

        res.status(200).json({
          message: "success",
          data: { token, ...info },
        });
      } else {
        res.status(404).json({ message: "password not correct" });
      }
    } else {
      res.status(404).json({ message: error.message });
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const sendText = async (req, res) => {
  try {
    client.messages.create({
      body: "Am in danger please send help",
      from: "+16602275687",
      to: "+2347010869307",
    });

    res.status(200).json({
      data: "message sent successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

module.exports = {
  getUser,
  getSingleUser,
  createUser,
  deleteSingleUser,
  signInUser,
  updateSingleUser,
  getAllUser,
  sendText,
  verifyUser,
};
