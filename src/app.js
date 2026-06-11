const express = require('express');
const path = require('path');
const routes = require('./routes/mundial.routes');
const { notFoundHandler, errorHandler } = require('./middleware/error.middleware');

const app = express();

// Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());

// Configurar Express para servir archivos estáticos desde public/imagenes en la ruta /imagenes/*
// Esto permite acceder, por ejemplo, a http://localhost:3000/imagenes/qatar-2022.jpg
app.use('/imagenes', express.static(path.join(__dirname, '../public/imagenes')));

// Configurar el enrutador de la API
app.use('/', routes);

// Middleware para capturar rutas no encontradas (404 Not Found)
app.use(notFoundHandler);

// Middleware global de manejo de errores (captura errores de Zod y otros del servidor)
app.use(errorHandler);

module.exports = app;
