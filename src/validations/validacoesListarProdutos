const Joi = require('joi');

const schemaListarProdutos = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.integer': 'O parâmetro id deve ser um número inteiro',
    'number.positive': 'O parâmetro id deve ser um número positivo',
    'any.required': 'O parâmetro id é obrigatório',
  }),
  categoria_id: Joi.number().integer().positive().messages({
    'number.integer': 'O parâmetro categoria_id deve ser um número inteiro',
    'number.positive': 'O parâmetro categoria_id deve ser um número positivo',
  }),
});

module.exports = {
  schemaListarProdutos,
};
