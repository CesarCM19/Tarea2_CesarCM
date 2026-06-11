const db = require('../../database/connection');
const { searchSchema } = require('../schemas/mundial.schema');

// GET / -> Información básica del API
const getHome = (req, res) => {
  res.json({
    nombre: "FIFA World Cup API RESTful",
    version: "1.0.0",
    descripcion: "API RESTful para consultar información histórica sobre las ediciones de la Copa Mundial de la FIFA (1930 - 2022)."
  });
};

// GET /mundiales -> Lista de todas las ediciones (básica por defecto, completa con ?include=full)
const getMundiales = (req, res, next) => {
  try {
    const includeFull = req.query.include === 'full';
    let query;

    if (includeFull) {
      query = db.prepare('SELECT * FROM mundiales ORDER BY anio ASC');
    } else {
      // Retorna solo datos básicos
      query = db.prepare('SELECT nombre, anio, sede, campeon, slug FROM mundiales ORDER BY anio ASC');
    }

    const results = query.all();
    res.json(results);
  } catch (error) {
    next(error);
  }
};

// GET /mundial/:slug -> Retorna la edición específica por su slug
const getMundialBySlug = (req, res, next) => {
  try {
    const { slug } = req.params;
    const stmt = db.prepare('SELECT * FROM mundiales WHERE slug = ?');
    const result = stmt.get(slug);

    if (!result) {
      return res.status(404).json({
        error: 'Not Found',
        mensaje: `No se encontró ningún mundial con el slug '${slug}'.`
      });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

// GET /campeon/:pais -> Retorna un array de strings con los slugs ganados por ese país
const getCampeon = (req, res, next) => {
  try {
    const { pais } = req.params;
    
    // Consulta insensible a mayúsculas y minúsculas usando LOWER en SQLite
    const stmt = db.prepare('SELECT slug FROM mundiales WHERE LOWER(campeon) = LOWER(?) ORDER BY anio ASC');
    const results = stmt.all(pais.trim());
    
    // Mapear los resultados para obtener solo un array de strings (slugs)
    const slugs = results.map(row => row.slug);
    res.json(slugs);
  } catch (error) {
    next(error);
  }
};

// GET /random -> Retorna una edición aleatoria de la base de datos
const getRandomMundial = (req, res, next) => {
  try {
    const stmt = db.prepare('SELECT * FROM mundiales ORDER BY RANDOM() LIMIT 1');
    const result = stmt.get();

    if (!result) {
      return res.status(404).json({
        error: 'Not Found',
        mensaje: 'No se encontraron mundiales registrados en la base de datos.'
      });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

// GET /search/:text -> Busca coincidencias en nombre, resumen o descripcion (valida min 3 chars con Zod)
const searchMundiales = (req, res, next) => {
  try {
    // Validar el parámetro con Zod
    // Lanza un ZodError si no cumple con min(3), el cual es atrapado por el bloque catch y procesado por el middleware de error
    const validatedParams = searchSchema.parse({ text: req.params.text });
    const { text } = validatedParams;

    // Buscar coincidencias con LIKE (el operador LIKE en SQLite es insensible a mayúsculas/minúsculas para caracteres ASCII)
    const searchQuery = `%${text}%`;
    const stmt = db.prepare(`
      SELECT * FROM mundiales 
      WHERE nombre LIKE ? 
         OR resumen LIKE ? 
         OR descripcion LIKE ?
      ORDER BY anio ASC
    `);

    const results = stmt.all(searchQuery, searchQuery, searchQuery);
    res.json(results);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getHome,
  getMundiales,
  getMundialBySlug,
  getCampeon,
  getRandomMundial,
  searchMundiales
};
