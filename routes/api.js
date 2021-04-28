var express = require("express");
var router = express.Router();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "api",
  password: "password",
  port: 5432,
});

/* POST: register new musician. */
router.post("/musician", function (req, res, next) {
  const getAge = (birthDate) =>
    Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

  let data = req.body;
  data.age = getAge(data.date_of_birth);

  const { name, age, date_of_birth, instrument, image_url } = data;
  pool.query(
    "INSERT INTO musicians(name, age, date_of_birth, instrument, image_url) VALUES($1, $2, $3, $4, $5)",
    [name, age, date_of_birth, instrument, image_url],
    (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      return res.json(results.rows);
    }
  );
});

/* GET: get all musicians. */
router.get("/musicians", (req, res, next) => {
  pool.query("SELECT * FROM musicians", (error, results) => {
    if (error) {
      console.log(error);
      throw error;
    }
    res.json(results.rows);
  });
});

/* GET: get one musician. */
router.get("/musicians/:id", (req, res, next) => {
  console.log(req.params.id);
  pool.query(
    "SELECT * FROM musicians WHERE musician_id = $1",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      res.json(results.rows);
    }
  );
});

// GET: all bands for single musician
router.get("/musicians/:id/bands", (req, res, next) => {
  console.log(req.params.id);
  pool.query(
    "SELECT b.band_id, name, description, image_url FROM musician_band mb JOIN bands b ON b.band_id = mb.band_id WHERE mb.musician_id = $1",
    [req.params.id],
    (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      res.json(results.rows);
    }
  );
});

/* POST: register new band. */
router.post("/bands", function (req, res, next) {
  console.log("hi");
  console.log(req.body);
  const { name, description, image_url } = req.body;

  pool.query(
    "INSERT INTO bands(name, description, image_url) VALUES($1, $2, $3)",
    [name, description, image_url],
    (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      return res.json(results.rows);
    }
  );
});

/* GET: get all bands. */
router.get("/bands", (req, res, next) => {
  pool.query("SELECT * FROM bands", (error, results) => {
    if (error) {
      console.log(error);
      throw error;
    }
    res.json(results.rows);
  });
});

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
