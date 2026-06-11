const app = require('./src/app');

// Configurar el puerto de escucha, por defecto el 3000
const PORT = process.env.PORT || 3000;

// Levantar el servidor
const server = app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(` Servidor de la Copa Mundial ejecutándose en el puerto ${PORT}`);
  console.log(` URL base: http://localhost:${PORT}`);
  console.log(`=======================================================`);
});

// Manejo del cierre ordenado (Graceful Shutdown)
const gracefulShutdown = () => {
  console.log('\nRecibida señal de terminación. Cerrando servidor de forma ordenada...');
  
  server.close(() => {
    console.log('Servidor HTTP cerrado.');
    
    // Cerrar la conexión de la base de datos
    try {
      const db = require('./database/connection');
      if (db && typeof db.close === 'function') {
        db.close();
        console.log('Conexión con SQLite cerrada correctamente.');
      }
    } catch (dbError) {
      console.error('Error al cerrar la conexión de la base de datos:', dbError);
    }
    
    process.exit(0);
  });
  
  // Forzar cierre tras 5 segundos si el servidor HTTP se queda colgado
  setTimeout(() => {
    console.error('No se pudo cerrar el servidor de forma limpia a tiempo. Forzando salida.');
    process.exit(1);
  }, 5000);
};

// Escuchar señales del sistema operativo
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
