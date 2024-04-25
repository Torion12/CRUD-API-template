const express = require("express");
const {
  getContacts,
  createContact,
  updateContact,
  getContact,
  deleteContacts,
} = require("../controller/contactController");

const router = express.Router();
router.route("/").get(getContacts).post(createContact);
router.route("/:id").put(updateContact).get(getContact).delete(deleteContacts);

module.exports = router;
