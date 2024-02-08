const Joi = require('joi')

const schemaEditarProduto = Joi.object({
      descricao: Joi.string().required().messages({
        'string.empty': 'O campo descricao não pode estar vazio',
        'any.required': 'O campo descricao é obrigatório',
    }),
    quantidade_estoque: Joi.number().integer().positive().required().messages({
        'number.integer': 'A quantidade deve ser um número inteiro',
        'number.positive': 'A quantidade deve ser um número positivo',
        'any.required': 'O campo quantidade_estoque é obrigatório',
    }),
    valor: Joi.number().integer().positive().required().messages({
        'number.integer': 'O valor deve ser um número inteiro',
        'number.positive': 'O valor deve ser um número positivo',
        'any.required': 'O campo valor é obrigatório',
    }),
    categoria_id: Joi.number().integer().positive().required().messages({
        'number.integer': 'A categoria_id deve ser um número inteiro',
        'number.positive': 'A categoria_id deve ser um número positivo',
        'any.required': 'O campo categoria_id é obrigatório',
    }),
})

module.exports = {
    schemaEditarProduto
}