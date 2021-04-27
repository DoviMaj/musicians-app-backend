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
  console.log(req.body);
  const getAge = (birthDate) =>
    Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

  let data = req.body;
  data.age = getAge(data.date_of_birth);

  const { name, instrument, image_url } = data;
  pool.query(
    "INSERT INTO musicians(name, instrument, image_url) VALUES($1, $2, $3);",
    [name, instrument, image_url],
    (error, results) => {
      if (error) {
        throw error;
      }
      return res.json(results.rows);
    }
  );
});

/* GET: get all musicians. */
router.get("/musicians", (req, res, next) => {
  pool.query("SELECT * FROM musicians;", (error, results) => {
    if (error) {
      throw error;
    }
    res.json(results.rows);
  });
});

/* POST: register new band. */
router.post("/bands", function (req, res, next) {
  console.log("hi");
  console.log(req.body);
  const { name, description, image_url } = req.body;

  pool.query(
    "INSERT INTO bands(name, description, image_url) VALUES($1, $2, $3);",
    [name, description, image_url],
    (error, results) => {
      if (error) {
        throw error;
      }
      return res.json(results.rows);
    }
  );
  // res.status(200).json(req.body);
});

/* GET: get all bands. */
router.get("/bands", (req, res, next) => {
  pool.query("SELECT * FROM bands;", (error, results) => {
    if (error) {
      throw error;
    }
    res.json(results.rows);
  });
});

module.exports = router;
