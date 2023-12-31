const express = require("express");
const router = express.Router();
const {
  getFilms,
  createFilm,
  getFilm,
  deleteFilm,
  updateFilm,
  likeFilm,
  unlikeFilm,
} = require("../controllers/filmControllers");

const { uploadImage } = require("../middlewares/uploadImages");

//get single films
router.get("/", getFilms);

//create films
router.post("/recommend", uploadImage.single("image"), createFilm);

//get single film
router.get("/:id", getFilm);

//delete film
router.delete("/:id", deleteFilm);

// update film
router.patch("/:id", updateFilm);

// liking a film
router.put("/:id/like", likeFilm);

// unliking a film
router.put("/:id/unlike", unlikeFilm);

module.exports = router;
