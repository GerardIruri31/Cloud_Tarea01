// db.js
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Usamos un archivo "books.sqlite" (análogo al students.sqlite del ejemplo)
const DB_PATH = path.join(__dirname, "books.sqlite");

function getDb() {
  // Opening with serialized mode for simple usage
  const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) console.error("Error abriendo DB:", err.message);
  });
  return db;
}

module.exports = { getDb, DB_PATH };
