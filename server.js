const express = require("express");
const dotenv = require("dotenv").config();
const ContactRoutes = require("./routes/contactRoutes");
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");

connectDb();
const app = express();
app.use(express.json());
app.use("/apiv1/contact/", ContactRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running ${PORT}`);
});
