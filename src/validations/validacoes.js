
//Pode usar para outras validações, em body



const Joi = require('joi');

const schemaCadastroUsuario = Joi.object({
  nome: Joi.string().required().messages({
    'string.empty': 'O campo nome não pode estar vazio',
    'any.required': 'O campo nome é obrigatório',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'O campo email deve ser um endereço de email válido',
    'string.empty': 'O campo email não pode estar vazio',
    'any.required': 'O campo email é obrigatório',
  }),
  senha: Joi.string().required().messages({
    'string.empty': 'O campo senha não pode estar vazio',
    'any.required': 'O campo senha é obrigatório',
  }),
});
 
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
  schemaCadastroUsuario,
  schemaLoginUsuario
};