const Film = require("../models/filmModel");
const mongoose = require("mongoose");
const cloudinaryUploadImg = require("../utils/cloudinary");

//get all films

const getFilms = async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  try {
    const films = await Film.find().sort({ createdAt: -1 });
    res.status(200).json({ status: "success", data: films });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

//create new film
const createFilm = async (req, res) => {
  const { title, release_date, genre, description, link, username } = req.body;
  const image = req.file;

  const requiredFields = [
    "title",
    "release_date",
    "genre",
    "description",
    "link",
    "username",
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
    console.log("Request Body Data:", {
      title,
      release_date,
      genre,
      description,
      link,
      image,
      username,
    });

    const newpathObject = await cloudinaryUploadImg(image.path, "image");
    const newpath = newpathObject.url;

    const film = new Film({
      title,
      release_date,
      genre,
      description,
      link,
      image: newpath,
      recommendedBy: username,
    });

    await film.save();

    console.log("Film is saved");
    res.status(200).json({ message: "Film is saved" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
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
