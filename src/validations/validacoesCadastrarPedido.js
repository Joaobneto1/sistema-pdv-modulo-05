const Joi = require('joi');

const schemaCadastroPedido = Joi.object({
  cliente_id: Joi.number().integer().required().messages({
    'any.required': 'O campo cliente_id é obrigatório.',
    'number.base': 'O cliente_id deve ser um número inteiro.',
  }),
  observacao: Joi.string().messages({
    'string.base': 'A observação deve ser uma string.',
  }),
  pedido_produtos: Joi.array().min(1).items(
    Joi.object({
      produto_id: Joi.number().integer().required().messages({
        'any.required': 'O campo produto_id é obrigatório.',
        'number.base': 'O produto_id deve ser um número inteiro.',
      }),
      quantidade_produto: Joi.number().integer().required().messages({
        'any.required': 'O campo quantidade_produto é obrigatório.',
        'number.base': 'A quantidade_produto deve ser um número inteiro.',
      }),
    })
  ).required().messages({
    'any.required': 'É necessário pelo menos um produto no pedido.',
  }),
});

module.exports = { schemaCadastroPedido };