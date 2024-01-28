const knex = require('../../database/conexao')
const { schemaCadastroCliente } = require('../../validations/validacoesCadastroCliente')

const cadastrarCliente = async (req, res) => {
  try {

  const {error, value} = schemaCadastroCliente.validate(req.body)

  if (error) {
    return res.status(400).json({mensagem: error.message})
  }

  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = value

    const verificarEmail = await knex('clientes')
    .where({email}).first()

    if (verificarEmail) {
      return res.status(400).json({mensagem: 'Já existe usuário cadastrado com o e-mail informado.'})
    }

    const verificarCpf = await knex('clientes')
    .where({cpf}).first()

    if (verificarCpf) {
      return res.status(400).json({mensagem: 'Já existe usuário cadastrado com o cpf informado.'})
    }

    const novoCliente = await knex('clientes')
    .insert({
      nome,
      email,
      cpf,
      cep,
      rua,
      numero,
      bairro,
      cidade,
      estado
    })
    .returning('*')

    return res.status(201).json(novoCliente[0])
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({mensagem: 'Erro interno do servidor'})
  }

}

module.exports = {
  cadastrarCliente
}