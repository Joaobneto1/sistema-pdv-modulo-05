const Joi = require('joi')

const schemaDetalharProduto = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.integer' : 'O parâmetro id deve ser um número inteiro',
    'number.positive' : 'O parâmetro id deve ser um número positivo',
    'any.required': 'O parâmetro id é obrigatório',
  }),
})

module.exports = {
  schemaDetalharProduto
}