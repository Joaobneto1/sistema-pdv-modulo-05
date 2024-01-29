const knex = require('../../database/conexao');

const listarProdutos = async (req, res) => {
  try {
    const { categoria_id } = req.query;

    let query = knex('produtos').select('*');

    if (categoria_id) {
      const categoriaExistente = await knex('categorias').where({ id: categoria_id }).first();

      if (!categoriaExistente) {
        return res.status(404).json({ mensagem: 'Categoria não encontrada' });
      }

      query = query.where('categoria_id', categoria_id);
    }

    const listaDeProdutos = await query;

    if (listaDeProdutos.length === 0) {
      return res.status(200).json({ mensagem: 'Nenhum produto encontrado.' });
    }

    res.status(200).json(listaDeProdutos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensagem: 'Erro interno do servidor.' });
  }
};

module.exports = {
  listarProdutos
};
