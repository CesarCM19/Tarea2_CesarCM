const { z } = require('zod');

// Esquema de validación para el parámetro de búsqueda
const searchSchema = z.object({
  text: z.string({
    required_error: 'El texto de búsqueda es obligatorio.',
    invalid_type_error: 'El texto de búsqueda debe ser una cadena de texto.'
  })
  .trim()
  .min(3, { message: 'El texto de búsqueda debe tener al menos 3 caracteres.' })
});

module.exports = {
  searchSchema
};
