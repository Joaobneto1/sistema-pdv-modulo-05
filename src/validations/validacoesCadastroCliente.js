const Joi = require('joi')

const schemaCadastroCliente = Joi.object({
  nome: Joi.string().required().messages({
    'string.empty': 'O campo nome não pode estar vazio',
    'any.required': 'O campo nome é obrigatório',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'O campo email deve ser um endereço de email válido',
    'string.empty': 'O campo email não pode estar vazio',
    'any.required': 'O campo email é obrigatório',
  }),
  cpf: Joi.number().integer().positive().required().messages({
    'number.integer': 'O cpf deve ser um número inteiro',
    'number.positive': 'O cpf deve ser um número positivo',
    'any.required': 'O campo cpf é obrigatório',
  }),
  cep: Joi.number().integer().positive().optional().messages({
    'number.integer': 'O cep deve ser um número inteiro',
    'number.positive': 'O cep deve ser um número positivo',
    'any.required': 'O campo cep é obrigatório',
  }),
  rua: Joi.string().optional().messages({
    'string.empty': 'Caso seja inserido, o campo rua não pode estar vazio',
  }),
  numero: Joi.number().integer().positive().optional().messages({
    'number.integer': 'O número deve ser inteiro',
    'number.positive': 'O número deve ser positivo',
  }),
  bairro: Joi.string().optional().messages({
    'string.empty': 'Caso seja inserido, o campo bairro não pode estar vazio',
  }),
  cidade: Joi.string().optional().messages({
    'string.empty': 'Caso seja inserido, o campo cidade não pode estar vazio',
  }),
  estado: Joi.string().optional().messages({
    'string.empty': 'Caso seja inserido, o campo estado não pode estar vazio',
  }),
});

module.exports = {
  schemaCadastroCliente
}