const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const session = require('express-session'); 
const MySQLStore = require('express-mysql-session')(session); 
const { body, validationResult } = require('express-validator');
const path = require('path');
const bcrypt = require('bcrypt'); 

const app = express();
const port = 5003;  //******PROFE AQUÍ*********

const sessionStore = new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'chimuelin777', // ******PROFE AQUÍ*********
    database: 'samoyedos_db'
});

app.use(session({
    secret: 'chimuelin777', 
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: { 
        secure: process.env.NODE_ENV === 'production', 
        httpOnly: true, 
        maxAge: 1000 * 60 * 60 * 24 
    }
}));

app.use((req, res, next) => {
    if (req.session.usuario) {
        const ahora = Date.now();
        const tiempoInactividadMaximo = 1000 * 60 * 30; 

        if (req.session.ultimoAcceso && ahora - req.session.ultimoAcceso > tiempoInactividadMaximo) {
            req.session.destroy((err) => {
                if (err) console.error('Error al destruir la sesión:', err);
                return res.redirect('/');
            });
        } else {
            req.session.ultimoAcceso = ahora;
        }
    }
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    for (const key in req.body) {
        if (typeof req.body[key] === 'string') {
            req.body[key] = req.body[key].replace(/<[^>]*>?/gm, '');
        }
    }
    next();
});

function verificarSesion(req, res, next) {
    if (!req.session.usuario) {
        return res.redirect('/'); 
    }
    next();
}

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

const htmlRegex = /^[^<>]*$/; 
const sqlRegex = /^[^'";]*$/;

const validarProducto = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('Nombre es requerido')
    .matches(htmlRegex).withMessage('El nombre contiene caracteres no permitidos')
    .matches(sqlRegex).withMessage('El nombre contiene caracteres peligrosos')
    .escape(),
  body('descripcion')
    .trim()
    .notEmpty().withMessage('Descripción es requerida')
    .matches(htmlRegex).withMessage('La descripción contiene caracteres no permitidos')
    .matches(sqlRegex).withMessage('La descripción contiene caracteres peligrosos')
    .escape(),
  body('precio')
    .isFloat({ gt: 0 }).withMessage('Precio debe ser mayor a 0'),
  body('stock')
    .isInt({ gt: -1 }).withMessage('Stock no puede ser negativo'),
  body('categoria')
    .trim()
    .notEmpty().withMessage('Categoría es requerida')
    .matches(htmlRegex).withMessage('La categoría contiene caracteres no permitidos')
    .matches(sqlRegex).withMessage('La categoría contiene caracteres peligrosos')
    .escape(),
  body('sku')
    .trim()
    .notEmpty().withMessage('SKU es requerido')
    .matches(htmlRegex).withMessage('El SKU contiene caracteres no permitidos')
    .matches(sqlRegex).withMessage('El SKU contiene caracteres peligrosos')
    .escape(),
  body('marca')
    .trim()
    .notEmpty().withMessage('Marca es requerida')
    .matches(htmlRegex).withMessage('La marca contiene caracteres no permitidos')
    .matches(sqlRegex).withMessage('La marca contiene caracteres peligrosos')
    .escape(),
  body('color')
    .trim()
    .notEmpty().withMessage('Color es requerido')
    .matches(htmlRegex).withMessage('El color contiene caracteres no permitidos')
    .matches(sqlRegex).withMessage('El color contiene caracteres peligrosos')
    .escape()
];

const validarUsuario = [
  body('username')
    .trim()
    .notEmpty().withMessage('El nombre de usuario es requerido')
    .isLength({ min: 3, max: 50 }).withMessage('El nombre de usuario debe tener entre 3 y 50 caracteres')
    .matches(htmlRegex).withMessage('El nombre de usuario contiene caracteres no permitidos')
    .matches(sqlRegex).withMessage('El nombre de usuario contiene caracteres peligrosos')
    .escape(),
  body('password')
    .notEmpty().withMessage('La contraseña es requerida')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(sqlRegex).withMessage('La contraseña contiene caracteres peligrosos')
    .escape()
];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/productos', (req, res) => {
  db.query('SELECT * FROM productos', (err, results) => {
      if (err) return res.status(500).json({ error: 'Error en la base de datos' });
      res.json(results);
  });
});

app.get('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  db.query('SELECT * FROM productos WHERE id = ?', [id], (err, results) => {
      if (err) return res.status(500).json({ error: 'Error en la base de datos' });
      if (results.length === 0) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json(results[0]);
  });
});

app.post('/productos', validarProducto, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  db.query('INSERT INTO productos SET ?', req.body, (err, result) => {
      if (err) return res.status(500).json({ error: 'Error al crear producto' });
      res.json({ id: result.insertId, ...req.body });
  });
});
app.put('/productos/:id', validarProducto, (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  db.query('UPDATE productos SET ? WHERE id = ?', [req.body, req.params.id], (err) => {
      if (err) return res.status(500).json({ error: 'Error al actualizar' });
      res.json({ success: true });
  });
});
app.delete('/productos/:id', (req, res) => {
  db.query('DELETE FROM productos WHERE id = ?', [req.params.id], (err) => {
      if (err) return res.status(500).json({ error: 'Error al eliminar' });
      res.json({ success: true });
  });
});

app.post('/register', validarUsuario, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO usuarios (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error al registrar usuario:', err);
                return res.status(500).json({ error: 'Error al registrar usuario' });
            }

            req.session.usuario = username;
            res.status(200).json({ success: true, redirect: '/tienda' }); 
        });
    } catch (err) {
        console.error('Error al procesar la solicitud:', err);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

app.post('/login', validarUsuario, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    db.query('SELECT * FROM usuarios WHERE username = ?', [username], async (err, results) => {
        if (err) {
            console.error('Error en la base de datos:', err);
            return res.status(500).json({ error: 'Error en la base de datos' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciales incorrectas' });
        }

        req.session.usuario = username;
        res.status(200).json({ success: true, redirect: '/tienda' });
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
            return res.status(500).json({ error: 'Error al cerrar sesión' });
        }
        res.clearCookie('connect.sid'); 
        res.status(200).send('Sesión cerrada correctamente');
    });
});

app.get('/tienda', verificarSesion, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'tienda.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'register.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).send('¡Algo salió mal!');
});

app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
});