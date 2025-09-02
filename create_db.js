// create_db.js
const { getDb } = require("./db");

const sql = `
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    genre TEXT NOT NULL,
    year TEXT
  );
`;

const db = getDb();
db.serialize(() => {
  db.run(sql, (err) => {
    if (err) {
      console.error("Error creando tabla:", err.message);
      process.exit(1);
    }
    console.log('Tabla "books" creada/verificada correctamente.');
    db.close();
  });
});
