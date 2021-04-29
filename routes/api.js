var express = require("express");
var router = express.Router();
require("dotenv").config();
const musicianController = require("../controllers/musicianController");
const bandController = require("../controllers/bandController");
require("../config/dbinit");
const Pool = require("pg").Pool;
const pool = new Pool();

// MUSICIANS
/* POST: register new musician. */
router.post("/musician", musicianController.register_musician);

/* GET: get all musicians. */
router.get("/musicians", musicianController.get_all_musicians);

/* GET: get one musician. */
router.get("/musicians/:id", musicianController.get_one_musician);

// GET: all bands for single musician
router.get(
  "/musicians/:id/bands",
  musicianController.get_all_bands_for_musician
);

// BANDS
/* POST: register new band. */
router.post("/bands", bandController.register_band);

/* GET: get one band. */
router.get("/bands/:id", bandController.get_one_band);

/* GET: get all bands. */
router.get("/bands", bandController.get_all_bands);

// GET: all musicians for single band
router.get("/bands/:id/musicians", bandController.get_all_musicians_for_band);

/* POST: add band to musician relationship. */
router.post("/musician_band", (req, res, next) => {
  console.log(req.body.band_id);
  const { band_id, musician_id } = req.body;
  pool.query(
    "INSERT INTO musician_band(musician_id, band_id) VALUES($1, $2)",
    [musician_id, band_id],
    (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      res.json(results.rows);
    }
  );
});

module.exports = router;
