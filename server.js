const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();


// Middleware
app.use(express.json());


// Home route
app.get("/", (req, res) => {
  res.json({
    message: "E-Commerce Platform API is running"
  });
});


// API routes
app.use("/api/v1/products", productRoutes);


// Error handler
app.use(errorHandler);


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT, () => {
      console.log(
        `Server running on http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });