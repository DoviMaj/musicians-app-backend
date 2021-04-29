const Pool = require("pg").Pool;
const pool = new Pool();

exports.register_band = (req, res, next) => {
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
};

exports.get_one_band = (req, res, next) => {
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
};

exports.get_all_bands = (req, res, next) => {
  pool.query("SELECT * FROM bands", (error, results) => {
    if (error) {
      console.log(error);
      throw error;
    }
    res.json(results.rows);
  });
};

exports.get_all_musicians_for_band = (req, res, next) => {
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
};
