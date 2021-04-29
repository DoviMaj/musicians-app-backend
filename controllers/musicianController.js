const Pool = require("pg").Pool;
const pool = new Pool();

exports.register_musician = (req, res, next) => {
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
};

exports.get_all_musicians = (req, res, next) => {
  pool.query("SELECT * FROM musicians", (error, results) => {
    if (error) {
      console.log(error);
      throw error;
    }
    res.json(results.rows);
  });
};

exports.get_one_musician = (req, res, next) => {
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
};

exports.get_all_bands_for_musician = (req, res, next) => {
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
};
