const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = 3000;

// IMPORTANTE: Esto permite a Node.js entender los datos del formulario (JSON)
app.use(express.json()); 
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de conexión a PostgreSQL
const pool = new Pool({
  user: 'admin',
  host: 'db', 
  database: 'cruz_azul',
  password: 'admin',
  port: 5432, 
});

// Endpoint GET: Consultar el listado existente
app.get('/api/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error("Error en GET:", err);
    res.status(500).send('Error en el servidor de Base de Datos');
  }
});

// Endpoint POST: Ingresar nuevos productos
app.post('/api/productos', async (req, res) => {
  const { nombre, descripcion, precio, stock } = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, stock) VALUES ($1, $2, $3, $4) RETURNING *',
      [nombre, descripcion, precio, stock]
    );
    res.status(201).json(result.rows[0]); // Devuelve éxito y el producto creado
  } catch (err) {
    console.error("Error en POST:", err);
    res.status(500).send('Error al insertar el producto en la BD');
  }
});

app.listen(port, () => {
  console.log(`Frontend ERP Cruz Azul corriendo en el puerto ${port}`);
});