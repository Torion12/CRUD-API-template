const asyncHandler = require("express-async-handler");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//description: Get all the contact on the list
//Method: Get
const getContacts = asyncHandler(async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany();
    console.log(allUsers);
    res.status(200).json(allUsers);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//description: Create New Contact on contact list
//Method: POST
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }

  try {
    const allUsers = await prisma.user.create({
      data: {
        name: name,
        email: email,
        phone: phone,
      },
    });

    res.status(201).json(allUsers);
  } catch (error) {
    if (error.code === "P2002" && error.meta?.target?.includes("email")) {
      // Unique constraint violation for email column
      res.status(400).json({ error: "Email already exists" });
    } else {
      console.error("Error creating user:", error);
      res.status(500);
    }
  }
});

//description: Update contact base on the Contact ID
//Method: PUT
const updateContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: name,
        email: email,
        phone: phone,
      },
    });
    res
      .status(200)
      .json({ message: "Updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating the user:", error);
    return res.status(500);
  }
});

//description: Get contact for the ID of the contact
//Method: Get
const getContact = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Validate that id is a valid MongoDB ObjectID

    const allUsers = await prisma.user.findMany({
      where: {
        id: id,
      },
      select: {
        name: true,
        email: true,
        phone: true,
      },
    });
    res.status(200).send(allUsers);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500);
  }
});

//description: delete Contact for the ID of contact
//Method: Delete
const deleteContacts = asyncHandler(async (req, res) => {
  try {
    const tobeDelete = await prisma.user.delete({
      where: {
        id: req.params.id,
      },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
      },
    });
    res.status(200).send({ user: tobeDelete });
  } catch (error) {
    console.error("Error Deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
  res.status(200).send({ message: `Delete user ${tobeDelete}` });
});

module.exports = {
  getContacts,
  createContact,
  updateContact,
  getContact,
  deleteContacts,
};
