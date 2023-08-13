const Film = require("../models/filmModel");
const mongoose = require("mongoose");
const fs = require("fs");

//get all films

const getFilms = async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  try {
    const page = parseInt(req.query.page) || 1; // Get the requested page, default to 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Get the requested limit, default to 10 if not provided

    // Calculate the skip value based on the requested page and limit
    const skip = (page - 1) * limit;

    // Query the database to get a page of films with the specified limit and skip values
    const films = await Film.find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get the total count of films for pagination
    const totalFilms = await Film.countDocuments();

    res.status(200).json({
      status: "ok",
      data: films,
      currentPage: page,
      totalPages: Math.ceil(totalFilms / limit),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//create new film
const createFilm = async (req, res) => {
  const { category, title, release_date, genre, description, link } = req.body;

  const requiredFields = [
    "category",
    "title",
    "release_date",
    "genre",
    "description",
    "link",
  ];

  const emptyFields = requiredFields.filter((field) => !req.body[field]);

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  if (!req.file) {
    return res.status(400).json({ error: "Please upload an image" });
  }

  const film = new Film({
    category,
    title,
    release_date,
    genre,
    description,
    link,
    image: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png",
    },
  });

  film
    .save()
    .then((res) => console.log("film is saved"))
    .catch((err) => console.log(err, "erorr has occured"));

  res.send("film is saved");
};

//get single film
const getFilm = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id " });
  }

  const film = await Film.findById(id);

  if (!film) {
    return res.status(400).json({ error: "No such film" });
  }

  res.status(200).json(film);
};

//delete single film

const deleteFilm = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id " });
  }

  const film = await Film.findOneAndDelete({ _id: id });

  if (!film) {
    return res.status(400).json({ error: "No such film" });
  }

  res.status(200).json(film);
};

// update single film

const updateFilm = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id " });
  }

  const film = await Film.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!film) {
    return res.status(400).json({ error: "No such film" });
  }

  res.status(200).json(film);
};

// like film
const likeFilm = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const film = await Film.findById(id);

    if (!film) {
      return res.status(404).json({ error: "Film not found" });
    }

    film.likes += 1;
    await film.save();

    res.status(200).json(film);
  } catch (err) {
    res.status(500).json({ error: error.message });
  }
};

// unliking a film
const unlikeFilm = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid id" });
  }

  try {
    const film = await Film.findById(id);

    if (!film) {
      return res.status(404).json({ error: "Film not found" });
    }

    if (film.likes === 0) {
      return res.status(400).json({ error: "Film has no likes to unlike" });
    }

    film.likes -= 1;
    await film.save();

    res.status(200).json({ status: "ok", likes: film.likes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getFilms,
  getFilm,
  createFilm,
  deleteFilm,
  updateFilm,
  likeFilm,
  unlikeFilm,
};
