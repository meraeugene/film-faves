require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const filmRoutes = require("./routes/filmRoutes");
const cors = require("cors");

//middleware
app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

// Allow requests from a specific origin (Vercel frontend)
const corsOptions = {
  origin: "https://film-gwjd.onrender.com/api/films",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Enable CORS for all routes
app.use(cors(corsOptions));

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
