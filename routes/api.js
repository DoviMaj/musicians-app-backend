var express = require("express");
var router = express.Router();
require("dotenv").config();
let multer = require("multer");
let upload = multer({ dest: "uploads/" });
const Pool = require("pg").Pool;
const pool = new Pool();

// Create musician table
pool.query(
  "CREATE TABLE IF NOT EXISTS musicians(musician_id SERIAL PRIMARY KEY, name VARCHAR ( 50 ) NOT NULL, age INT NOT NULL, date_of_birth DATE NOT NULL, instrument VARCHAR ( 50 ) NOT NULL, image_url VARCHAR ( 200 ) NOT NULL);",
  [],
  (err, result) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    }
  }
);

// Create band table
pool.query(
  "CREATE TABLE IF NOT EXISTS bands( band_id SERIAL PRIMARY KEY, name VARCHAR ( 20 ) NOT NULL, description VARCHAR ( 200 ) NOT NULL,image_url VARCHAR ( 200 ) NOT NULL)",
  [],
  (err, result) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    }
  }
);

// Create junction table
pool.query(
  "CREATE TABLE IF NOT EXISTS musician_band( id SERIAL PRIMARY KEY, musician_id INT NOT NULL, band_id INT NOT NULL);",
  [],
  (err, result) => {
    if (err) {
      return console.error("Error executing query", err.stack);
    }
  }
);

// MUSICIANS
/* POST: register new musician. */
router.post("/musician", function (req, res, next) {
  const getAge = (birthDate) =>
    Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

  let data = req.body;
  data.age = getAge(data.date_of_birth);

  const { name, age, date_of_birth, instrument, image_url } = data;
  pool.query(
    "INSERT INTO musicians(name, age, date_of_birth, instrument, image_url) VALUES($1, $2, $3, $4, $5) returning *",
    [name, age, date_of_birth, instrument, image_url],
    (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json(error);
      }
      return res.json(results.rows[0]);
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

// BANDS

/* POST: register new band. */
router.post("/bands", function (req, res, next) {
  console.log("hi");
  console.log(req.body);
  const { name, description, image_url } = req.body;

  pool.query(
    "INSERT INTO bands(name, description, image_url) VALUES($1, $2, $3) returning *",
    [name, description, image_url],
    (error, results) => {
      if (error) {
        console.log(error);
        throw error;
      }
      return res.json(results.rows[0]);
    }
  );
});

/* GET: get one band. */
router.get("/bands/:id", (req, res, next) => {
  console.log(req.params.id);
  pool.query(
    "SELECT * FROM bands WHERE band_id = $1",
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

/* GET: get all bands. */
router.get("/bands", upload.single("image"), (req, res, next) => {
  console.log(req.file, req.body);
  pool.query("SELECT * FROM bands", (error, results) => {
    if (error) {
      console.log(error);
      throw error;
    }
    res.json(results.rows);
  });
});

// GET: all musicians for single band
router.get("/bands/:id/musicians", (req, res, next) => {
  console.log(req.params.id);
  pool.query(
    "SELECT m.musician_id, name, instrument, date_of_birth, age, image_url FROM musician_band mb JOIN musicians m ON m.musician_id = mb.musician_id WHERE mb.band_id = $1;",
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
