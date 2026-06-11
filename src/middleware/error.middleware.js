const { ZodError } = require('zod');

// Middleware para manejar errores de rutas no encontradas (404 Not Found)
const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    error: 'Not Found',
    mensaje: `La ruta solicitada '${req.originalUrl}' no existe en este servidor.`
  });
};

// Middleware global para manejo de errores
const errorHandler = (err, req, res, next) => {
  // Si el error es una instancia de ZodError (validación fallida)
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Bad Request',
      mensaje: 'Validación de datos fallida.',
      detalles: err.issues.map(e => ({
        parametro: e.path.join('.'),
        mensaje: e.message
      }))
    });
  }

  // Registro detallado del error en consola para depuración
  console.error('Error no controlado capturado por el middleware:', err);

  // Respuesta de error interno del servidor
  res.status(500).json({
    error: 'Internal Server Error',
    mensaje: 'Ocurrió un error inesperado en el servidor.'
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};
