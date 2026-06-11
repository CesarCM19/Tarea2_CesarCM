const Database = require('better-sqlite3');
const path = require('path');

// Definir la ruta del archivo de base de datos
const dbPath = path.resolve(__dirname, '../copa_mundial.db');

// Conectar a la base de datos SQLite
let db;
try {
  db = new Database(dbPath, { 
    // Opciones adicionales si se requieren
    fileMustExist: false,
    verbose: console.log // Esto registrará las consultas SQL en la consola para depuración
  });
  
  // Habilitar claves foráneas y optimizaciones de rendimiento
  db.pragma('journal_mode = WAL');
  db.pragma('synchronous = NORMAL');
  
  console.log(`Conexión exitosa a la base de datos SQLite en: ${dbPath}`);
} catch (error) {
  console.error('Error al conectar con la base de datos SQLite:', error);
  process.exit(1);
}

module.exports = db;
