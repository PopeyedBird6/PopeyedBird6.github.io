const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const { body, validationResult } = require('express-validator');
const path = require('path');

const app = express();
const port = 5001;  //******PROFE AQUÍ*********

// ======================
// Configuración Inicial
// ======================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ======================
// Conexión a MySQL
// ======================
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',          // ******PROFE AQUÍ********* 
  password: 'chimuelin777',          // ******PROFE AQUÍ*********
  database: 'samoyedos_db'
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Conectado a MySQL');
});

// ======================
// Validaciones
// ======================
const htmlRegex = /^[^<>]*$/;  //  Bloquea etiquetas HTML

const validarProducto = [
  body('nombre').trim().notEmpty().withMessage('Nombre es requerido').matches(htmlRegex).escape(),
  body('descripcion').trim().notEmpty().withMessage('Descripción es requerida').matches(htmlRegex).escape(),
  body('precio').isFloat({ gt: 0 }).withMessage('Precio debe ser mayor a 0'),
  body('stock').isInt({ gt: -1 }).withMessage('Stock no puede ser negativo'),
  body('categoria').trim().notEmpty().withMessage('Categoría es requerida').matches(htmlRegex).escape(),
  body('sku').trim().notEmpty().withMessage('SKU es requerido').matches(htmlRegex).escape(),
  body('marca').trim().notEmpty().withMessage('Marca es requerida').matches(htmlRegex).escape(),
  body('color').trim().notEmpty().withMessage('Color es requerido').matches(htmlRegex).escape()
];

// ======================
// Rutas
// ======================
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Obtener todos los productos
app.get('/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
      if (err) return res.status(500).json({ error: 'Error en la base de datos' });
      res.json(results);
  });
});
// Obtener un producto por ID
app.get('/productos/:id', (req, res) => {
  db.query('SELECT * FROM productos WHERE id = ?', [req.params.id], (err, results) => {
      if (err) return res.status(500).json({ error: 'Error en la base de datos' });
      if (results.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json(results[0]);
  });
});
// Crear un producto
app.post('/productos', validarProducto, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  db.query('INSERT INTO productos SET ?', req.body, (err, result) => {
      if (err) return res.status(500).json({ error: 'Error al crear producto' });
      res.json({ id: result.insertId, ...req.body });
  });
});
// Actualizar producto
app.put('/productos/:id', validarProducto, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  db.query('UPDATE productos SET ? WHERE id = ?', [req.body, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: 'Error al actualizar' });
      res.json({ success: true });
  });
});
// Eliminar producto
app.delete('/productos/:id', (req, res) => {
  db.query('DELETE FROM productos WHERE id = ?', [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: 'Error al eliminar' });
      res.json({ success: true });
  });
});

// ======================
// Manejo de Errores
// ======================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

// ======================
// Iniciar Servidor
// ======================
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});