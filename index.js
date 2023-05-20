const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

// Puerto en el que se ejecutará el servidor
const port = 3000;

const app = express();
app.use(express.json());

// Configuración de la conexión a la base de datos MySQL
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Obtener una conexión del grupo de conexiones
function getConnection(callback) {
  pool.getConnection((err, connection) => {
    if (err) {
      return callback(err);
    }
    callback(null, connection);
  });
}

// Iniciar el servidor
app.listen(port, () => {
  console.log("Servidor iniciado en el puerto " + port);
});

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.get("/emails", (req, res) => {
  getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener una conexión: ', err);
      res.status(500).json({ error: 'Error al obtener una conexión' });
    } else {
      connection.query('SELECT * FROM user_info', (err, rows) => {
        connection.release(); // Liberar la conexión

        if (err) {
          console.error('Error al obtener los elementos: ', err);
          res.status(500).json({ error: 'Error al obtener los elementos' });
        } else {
          res.json(rows);
        }
      });
    }
  });
});

app.post("/emails", (req, res) => {
  const nuevoElemento = req.body;

  getConnection((err, connection) => {
    if (err) {
      console.error('Error al obtener una conexión: ', err);
      res.status(500).json({ error: 'Error al obtener una conexión' });
    } else {
      connection.query('INSERT INTO user_info SET ?', nuevoElemento, (err, result) => {
        connection.release(); // Liberar la conexión

        if (err) {
          console.error('Error al crear el elemento: ', err);
          res.status(500).json({ error: 'Error al crear el elemento' });
        } else {
          res.json({ id: result.insertId });
        }
      });
    }
  });
});

module.exports = app;
