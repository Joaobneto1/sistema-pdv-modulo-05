
const Joi = require('joi');

const schemaLoginUsuario = Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'O campo email precisa ter um formato válido',
      'any.required': 'O campo email é obrigatório',
      'string.empty': 'O campo email é obrigatório',
    }),
  
    senha: Joi.string().required().messages({
      'any.required': 'O campo senha é obrigatório',
      'string.empty': 'O campo senha é obrigatório',
    }),
  }) 
  
  module.exports = {
    schemaLoginUsuario
  };