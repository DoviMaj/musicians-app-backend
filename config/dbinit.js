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
