require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const filmRoutes = require("./routes/filmRoutes");
const userRoutes = require("./routes/userRoutes");

//middleware
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "https://filmsfavesapi.onrender.com/api/films"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  console.log(req.method, req.path);
  next();
});

// Enable CORS for all routes
app.use(cors());

//to get the req.body
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//routes
app.use("/api/films", filmRoutes);
app.use("/api/user", userRoutes);

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => {
    app.listen(process.env.PORT, () => {
      console.log(`connected to db & listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
