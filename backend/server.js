require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
import("node-fetch").then((fetchModule) => {
  const fetch = fetchModule.default;

  const filmRoutes = require("./routes/filmRoutes");
  const userRoutes = require("./routes/userRoutes");

  //middleware
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://filmfaves.vercel.app/");
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

  // Proxy route
  app.get("/api/proxy", async (req, res) => {
    try {
      const remoteUrl = "https://filmsfavesapi.onrender.com/api/films?page=1"; // Update with the correct remote API URL
      const response = await fetch(remoteUrl);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "An error occurred while fetching data" });
    }
  });

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
});
