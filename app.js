// app.js
const express = require("express");
const multer = require("multer");
const { getDb } = require("./db");

const app = express();
const upload = multer(); // Para leer campos form-data (multipart)

app.get("/books", (req, res) => {
  const db = getDb();
  db.all("SELECT * FROM books", [], (err, rows) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    // Devolvemos un array de objetos (igual que tu /students en Flask)
    res.json(rows);
  });
});

// POST /books con form-data: title, author, genre, year
app.post("/books", upload.none(), (req, res) => {
  const db = getDb();
  const { title, author, genre, year } = req.body;

  const sql = `INSERT INTO books (title, author, genre, year) VALUES (?, ?, ?, ?)`;
  db.run(sql, [title, author, genre, year], function (err) {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    // Mensaje estilo Flask: "Book with id: X created successfully"
    res.status(201).send(`Book with id: ${this.lastID} created successfully`);
  });
});

app.get("/book/:id", (req, res) => {
  const db = getDb();
  const { id } = req.params;
  db.get("SELECT * FROM books WHERE id = ?", [id], (err, row) => {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).send("Something went wrong");
    res.status(200).json(row);
  });
});

// PUT /book/:id con form-data: title, author, genre, year
app.put("/book/:id", upload.none(), (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const { title, author, genre, year } = req.body;

  const sql = `
    UPDATE books
       SET title = ?, author = ?, genre = ?, year = ?
     WHERE id = ?
  `;
  const updatedBook = { id: Number(id), title, author, genre, year };

  db.run(sql, [title, author, genre, year, id], function (err) {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    res.json(updatedBook);
  });
});

app.delete("/book/:id", (req, res) => {
  const db = getDb();
  const { id } = req.params;
  const sql = `DELETE FROM books WHERE id = ?`;
  db.run(sql, [id], function (err) {
    db.close();
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).send(`The Book with id: ${id} has been deleted.`);
  });
});

const PORT = 8000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
