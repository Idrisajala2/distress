const express = require("express");

const contactRouter = express.Router();

const {
  createContact,
  getContacts,
} = require("../controller/contactController");

contactRouter.route("/user/:userID").post(createContact);

contactRouter.route("/user/:userID/contact").get(getContacts);

module.exports = contactRouter;
