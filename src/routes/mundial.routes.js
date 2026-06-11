const express = require('express');
const router = express.Router();
const {
  getHome,
  getMundiales,
  getMundialBySlug,
  getCampeon,
  getRandomMundial,
  searchMundiales
} = require('../controllers/mundial.controller');

// GET / -> Información básica del API
router.get('/', getHome);

// GET /mundiales -> Retorna todas las ediciones (básicas, o completas con ?include=full)
router.get('/mundiales', getMundiales);

// GET /mundial/:slug -> Retorna la edición específica buscando por slug
router.get('/mundial/:slug', getMundialBySlug);

// GET /campeon/:pais -> Retorna slugs de las ediciones ganadas por ese país
router.get('/campeon/:pais', getCampeon);

// GET /random -> Retorna una edición aleatoria de la base de datos
router.get('/random', getRandomMundial);

// GET /search/:text -> Busca coincidencias en nombre, resumen o descripcion (mínimo 3 caracteres)
router.get('/search/:text', searchMundiales);

module.exports = router;
