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

// multer for image upload
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../frontend/public/images/posters");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

//get single films
router.get("/", getFilms);

//create films
router.post("/", upload.single("image"), createFilm);

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