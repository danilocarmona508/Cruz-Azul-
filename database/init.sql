-- Creación de la tabla de productos para Farmacias Cruz Azul
CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio NUMERIC(10, 2) NOT NULL,
    stock INTEGER NOT NULL
);

-- Insertar datos iniciales de prueba
INSERT INTO productos (nombre, descripcion, precio, stock) VALUES
('Paracetamol 500mg', 'Caja x 20 comprimidos', 1500, 100),
('Ibuprofeno 400mg', 'Caja x 10 cápsulas', 2000, 50),
('Vitamina C 1000mg', 'Tubo efervescente x 10', 3500, 30);