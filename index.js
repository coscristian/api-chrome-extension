const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

// Puerto en el que se ejecutará el servidor
const port = 3000;

const app = express();
app.use(express.json());

// Configuración de la conexión a la base de datos MySQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Conexión a la base de datos MySQL
connection.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos: ", err);
  } else {
    console.log("Conexión exitosa a la base de datos");
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log("Servidor iniciado en el puerto " + port);
});

app.get("/", (req, res) => {
    res.send("Hola mundo");
});

app.get("/emails", (req, res) => {
  connection.query("SELECT * FROM emails", (err, rows) => {
    if (err) {
      console.error("Error al obtener los elementos: ", err);
      res.status(500).json({ error: "Error al obtener los elementos" });
    } else {
      res.json(rows);
    }
  });
});

app.post("/emails", (req, res) => {
  const nuevoElemento = req.body;
  connection.query("INSERT INTO emails SET ?", nuevoElemento, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error al crear el elemento " + err });
    } else {
      res.json({ id: result.insertId });
    }
  });
});

module.exports = app;