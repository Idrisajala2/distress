const contactModel = require("../model/contactsModel");

const userModel = require("../model/userModel");

const createContact = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userID);
    const contact = new contactModel(req.body);
    contact.user = user;
    contact.save();
    user.contacts.push(contact);
    user.save();
    res.status(200).json({
      status: 200,
      data: contact,
    });
  } catch (err) {
    res.status(500).json({
      messgae: err.messgae,
    });
  }
};

const getContacts = async (req, res) => {
  try {
    const userID = req.params.userID;

    const { contacts } = await userModel.findById(userID).populate("contacts");

    res.status(200).json({
      status: "Found all contacts",
      data: contacts,
    });
  } catch (err) {
    res.status(500).json({
      messgae: err.messgae,
    });
  }
};

module.exports = { createContact, getContacts };
