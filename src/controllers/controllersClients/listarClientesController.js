const knex = require('../../database/conexao');

const listarClientes = async (req, res) => {
    try {
        const usuario = req.usuario;

        const clientes = await knex('clientes').select('id', 'nome', 'email');

        res.status(200).json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = {
    listarClientes
};
