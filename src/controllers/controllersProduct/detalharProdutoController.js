const knex = require('../../database/conexao')
const { schemaDetalharProduto } = require('../../validations/validacoesDetalharProduto')

const detalharProduto = async(req, res) => {

  const {error, value} = schemaDetalharProduto.validate(req.params);

  if (error) {
    return res.status(400).json({ mensagem: error.message });
  }

  const { id } = value

  try {
    const produtoEncontrado = await knex('produtos')
      .select('*')
      .where({id}).first()

      if (!produtoEncontrado) {
       return res.status(404).json({mensagem: 'Produto não encontrado'})
      }

      return res.status(200).json(produtoEncontrado)    
  } catch (error) {
    res.status(500).json({mensagem: 'Erro interno do servidor'})
  }
}

module.exports = detalharProduto