const knex = require('../database/conexao');

const listarCategorias = async (req, res) => {

    try {
        const listar = await knex('categorias')
        return res.status(202).json(listar)
    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro no Servidor.' })
    }
}

module.exports = {
    listarCategorias
}