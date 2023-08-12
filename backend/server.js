require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const filmRoutes = require("./api");
const cors = require("cors");

//middleware
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// Enable CORS for all routes
app.use(
  cors({
    origin: ["https://film-faves-api.vercel.app/"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

//to get the req.body
app.use(express.json());

//routes
app.use("/api/films", filmRoutes);

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
