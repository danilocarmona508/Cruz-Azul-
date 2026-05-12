const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

// Middleware para procesar JSON y servir archivos estáticos (HTML)
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de la conexión a PostgreSQL
// Usa los mismos datos que pusiste en el docker-compose.yml
const pool = new Pool({
  user: 'admin',
  host: 'db', // Este es el nombre del servicio en docker-compose
  database: 'cruz_azul',
  password: 'admin',
  port: 5432, 
});

// Endpoint GET para obtener los productos
app.get('/api/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error en el servidor de Base de Datos');
  }
});

// Endpoint POST para crear un nuevo producto
app.post('/api/productos', async (req, res) => {
  const { nombre, descripcion, precio, stock } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, descripcion, precio, stock]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al insertar el producto en la BD');
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Frontend ERP Cruz Azul corriendo en el puerto ${port}`);
});