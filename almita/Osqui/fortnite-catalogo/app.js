// app.js

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const path = require('path');

const app = express();
const port = 3000;

// Configuración de la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Tumadrequesemeabrecarapinga', // Cambia esto por tu contraseña de MySQL
  database: 'fortnite_catalogo',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir el archivo index.html en la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para obtener todas las armas
app.get('/armas', (req, res) => {
  db.query('SELECT * FROM armas', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Ruta para registrar una nueva arma
app.post(
  '/armas',
  [
    body('nombre').notEmpty().withMessage('El nombre es obligatorio').escape(),
    body('tipo').notEmpty().withMessage('El tipo es obligatorio').escape(),
    body('daño').isInt({ gt: 0 }).withMessage('El daño debe ser un número entero positivo'),
    body('rareza').notEmpty().withMessage('La rareza es obligatoria').escape(),
    body('municion').isInt({ gt: 0 }).withMessage('La munición debe ser un número entero positivo'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nombre, tipo, daño, rareza, municion } = req.body;
    const query = 'INSERT INTO armas (nombre, tipo, daño, rareza, municion) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nombre, tipo, daño, rareza, municion], (err, result) => {
      if (err) throw err;
      res.status(201).json({ message: 'Arma registrada correctamente', id: result.insertId });
    });
  }
);

// Ruta para eliminar un arma por ID
app.delete('/armas/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM armas WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Arma no encontrada' });
    }
    res.json({ message: 'Arma eliminada correctamente' });
  });
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
