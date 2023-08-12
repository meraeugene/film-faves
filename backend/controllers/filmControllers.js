const Film = require("../models/filmModel");
const mongoose = require("mongoose");

//get all films
const getFilms = async (req, res) => {
  // const films = await Film.find({}).sort({ createdAt: -1 });
  // res.status(200).json(films);

  try {
    const films = await Film.find({}).sort({ likes: -1 });
    res.status(200).json({ status: "ok", data: films });
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

  try {
    const film = await Film.create({
      category,
      title,
      release_date,
      genre,
      description,
      link,
      image: req.file.filename,
    });
    res.status(200).json(film);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
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

  const film = await Film.findOneAndDelete(id);

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
