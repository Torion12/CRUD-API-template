const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//description: Get all the contact on the list
//Method: Get
const getContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.find();

  res.status(200).json(contact);
});

//description: Create New Contact on contact list
//Method: POST
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
  });

  res.status(201).json(contact);
});

//description: Update contact base on the Contact ID
//Method: PUT
const updateContact = asyncHandler(async (req, res) => {
  res.status(200).send({ message: `Updated for ${req.params.id}` });
});

//description: Get contact for the ID of the contact
//Method: Get
const getContact = asyncHandler(async (req, res) => {
  res.status(200).send({ message: `Get Get contact for ${req.params.id}` });
});

//description: delete Contact for the ID of contact
//Method: Delete
const deleteContacts = asyncHandler(async (req, res) => {
  res.status(200).send({ message: `Delete for ${req.params.id}` });
});

module.exports = {
  getContacts,
  createContact,
  updateContact,
  getContact,
  deleteContacts,
};
